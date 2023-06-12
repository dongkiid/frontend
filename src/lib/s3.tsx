import AWS from "aws-sdk";

export const uploadS3 = async (formData: any) => {
  const REGION = process.env.REACT_APP_MY_AWS_S3_BUCKET_REGION;
  const ACCESS_KEY_ID = process.env.REACT_APP_MY_AWS_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_MY_AWS_SECRET_KEY;

  AWS.config.update({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3();
  const params = {
    ACL: "public-read",
    Bucket: process.env.REACT_APP_MY_AWS_S3_BUCKET,
    Key: `pet-profile/${formData.get("name")}`,
    Body: formData.get("file"),
    ContentType: formData.get("type"),
  };

  try {
    //s3에 사진 업로드 한 뒤 s3이미지 링크를 return
    const data = await s3.upload(params).promise();
    const imgUrl = data.Location;
    return imgUrl;
  } catch (error) {
    console.log("에러 " + error);
    throw error;
  }
};
