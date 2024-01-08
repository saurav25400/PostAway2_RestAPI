import nodemailer from 'nodemailer';

const sendOtpInmail=async(email,otp)=>{
    try{
        let transporter=nodemailer.createTransport({
            //for mail sending we can use either smtp server or any third party service like google
            service:'gmail',
            secure: true,
            auth:{
                user:"saurav25400@gmail.com",
                pass:"qlbe yiff cawz abpe"  //application password ..go to securit-->2 step verification to set app password
            }
        })
        //send emails to user..using transporter
        const info=await transporter.sendMail({
            from:"saurav25400@gmail.com",
            to:email,
            subject:"PostAway App Verification Email",
            text:"This is a verification email from PostAway App",
            html:`<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        })
        console.log("Email info: ", info);
        return {success:true,information:info};
    }
    catch(error){
        console.log(error.message);

    }

}

export default  sendOtpInmail;