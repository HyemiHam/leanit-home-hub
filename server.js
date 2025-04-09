import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일에서 환경 변수 로드

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// console.log('CLIENT_ID=', CLIENT_ID);
// console.log('CLIENT_SECRET=', CLIENT_SECRET);
// console.log('REFRESH_TOKEN=', REFRESH_TOKEN);

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(name, email, phone, message) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'hyemi7499@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'hyemi7499@gmail.com',
      to: 'hyemi222@hotmail.com',
      subject: '새로운 문의가 도착했습니다',
      text: `이름: ${name}\n이메일: ${email}\n전화번호: ${phone}\n메시지: ${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log('Error sending email:', error);
    throw new Error('이메일 전송에 실패했습니다.');
  }
}

app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await sendMail(name, email, phone, message);
    res.status(200).send('이메일이 성공적으로 전송되었습니다.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function sendChat(msg) {
  try {
    const result = `${msg}에 대한 AI응답 리턴`;
    return result;
  } catch (error) {
    console.log('Error sendChat:', error);
    throw new Error('AI응답 전송에 실패했습니다.');
  }
}

//  카카오 챗봇 테스트용 API
app.post('/api/chat-test', async (req, res) => {
  const msg = req.body.msg;

  try {
    let rtnMsg = await sendChat(msg);
    res.status(200).send({
      rtnMsg: rtnMsg,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});