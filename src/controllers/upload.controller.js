const AWS = require("aws-sdk")
const { orderBy } = require("lodash")
const config = require("../config/config")
const catchAsync = require("../utils/catchAsync");


const s3Credentials = new AWS.Credentials({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
})

const s3 = new AWS.S3({
  credentials: s3Credentials,
})

const BUCKET_NAME = config.aws.s3.bucketName


const initializeMultipartUpload = catchAsync(async (req, res) => {
  const { name } = req.body
  const fileName = `${Date.now()}_${name}`

  const multipartParams = {
    Bucket: BUCKET_NAME,
    Key: `${fileName}`,
    ACL: "public-read",
  }

  const multipartUpload = await s3.createMultipartUpload(multipartParams).promise()

  res.send({
    fileId: multipartUpload.UploadId,
    fileKey: multipartUpload.Key,
  })
})

const getMultipartPreSignedUrls = catchAsync(async (req, res) => {
  const { fileKey, fileId, parts } = req.body

  const multipartParams = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
    UploadId: fileId,
  }

  const promises = []

  for (let index = 0; index < parts; index++) {
    promises.push(
      s3.getSignedUrlPromise("uploadPart", {
        ...multipartParams,
        PartNumber: index + 1,
      }),
    )
  }

  const signedUrls = await Promise.all(promises)

  const partSignedUrlList = signedUrls.map((signedUrl, index) => {
    return {
      signedUrl: signedUrl,
      PartNumber: index + 1,
    }
  })

  res.send({
    parts: partSignedUrlList,
  })
})

const finalizeMultipartUpload = catchAsync(async (req, res) => {
  const { fileId, fileKey, parts } = req.body

  const multipartParams = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
    UploadId: fileId,
    MultipartUpload: {
      // ordering the parts to make sure they are in the right order
      Parts: orderBy(parts, ["PartNumber"], ["asc"]),
    },
  }

  await s3.completeMultipartUpload(multipartParams).promise()

  res.send()
})

module.exports = {
  initializeMultipartUpload,
  getMultipartPreSignedUrls,
  finalizeMultipartUpload
}
