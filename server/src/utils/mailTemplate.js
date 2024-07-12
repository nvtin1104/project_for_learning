export const resetPasswordTemplate =  (name, password) => {
  return mailTemplate(`
      <div class="content">
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader">Reset your password</span>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <p>Hi ${name},</p>
                    <p>This is your new password: ${password}</p>
                  
                    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                    <p>Thanks,<br>Your Company Team</p>
                  </td>
                </tr>
                <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>
                      <br> Don't like these emails? <a href="http://htmlemail.io/blog">Unsubscribe</a>.
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                      Powered by <a href="http://htmlemail.io">HTMLemail.io</a>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
              <!-- END CENTERED WHITE CONTAINER -->
            </div>`)
}
export const passwordForGG = async (name, password) => {
  return mailTemplate(`
      <div class="content">
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader">Reset your password</span>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <p>Hi ${name},</p>
                    <p>You have created  account with Gmail</p>
                    <p>This is your new username: ${name}</p>
                    <p>This is your new password: ${password}</p>
                  
                  </td>
                </tr>
                <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>
                      <br> Don't like these emails? <a href="http://htmlemail.io/blog">Unsubscribe</a>.
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                      Powered by <a href="http://htmlemail.io">HTMLemail.io</a>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
              <!-- END CENTERED WHITE CONTAINER -->
            </div>`)
}
 const mailTemplate = (content) => {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Password Reset</title>
      <style media="all" type="text/css">
        body {
          font-family: Helvetica, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 16px;
          line-height: 1.3;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          background-color: #f4f5f6;
          margin: 0;
          padding: 0;
        }

        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
        }

        table td {
          font-family: Helvetica, sans-serif;
          font-size: 16px;
          vertical-align: top;
        }

        .container {
          margin: 0 auto !important;
          max-width: 600px;
          padding: 0;
          padding-top: 24px;
          width: 600px;
        }

        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 600px;
          padding: 0;
        }

        .main {
          background: #ffffff;
          border: 1px solid #eaebed;
          border-radius: 16px;
          width: 100%;
        }

        .wrapper {
          box-sizing: border-box;
          padding: 24px;
        }

        .footer {
          clear: both;
          padding-top: 24px;
          text-align: center;
          width: 100%;
        }

        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #9a9ea6;
          font-size: 16px;
          text-align: center;
        }

        p {
          font-family: Helvetica, sans-serif;
          font-size: 16px;
          font-weight: normal;
          margin: 0;
          margin-bottom: 16px;
        }

        a {
          color: #0867ec;
          text-decoration: underline;
        }

        .btn {
          box-sizing: border-box;
          min-width: 100% !important;
          width: 100%;
        }

        .btn > tbody > tr > td {
          padding-bottom: 16px;
        }

        .btn table {
          width: auto;
        }

        .btn table td {
          background-color: #ffffff;
          border-radius: 4px;
          text-align: center;
        }

        .btn a {
          background-color: #0867ec;
          border: solid 2px #0867ec;
          border-radius: 4px;
          box-sizing: border-box;
          color: #ffffff;
          cursor: pointer;
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          margin: 0;
          padding: 12px 24px;
          text-decoration: none;
          text-transform: capitalize;
        }

        .btn-primary table td {
          background-color: #0867ec;
        }

        .btn-primary a {
          background-color: #0867ec;
          border-color: #0867ec;
          color: #ffffff;
        }

        @media all {
          .btn-primary table td:hover {
            background-color: #ec0867 !important;
          }

          .btn-primary a:hover {
            background-color: #ec0867 !important;
            border-color: #ec0867 !important;
          }
        }

        @media only screen and (max-width: 640px) {
          .main p,
          .main td,
          .main span {
            font-size: 16px !important;
          }

          .wrapper {
            padding: 8px !important;
          }

          .content {
            padding: 0 !important;
          }

          .container {
            padding: 0 !important;
            padding-top: 8px !important;
            width: 100% !important;
          }

          .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }

          .btn table {
            max-width: 100% !important;
            width: 100% !important;
          }

          .btn a {
            font-size: 16px !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }

        @media all {
          .ExternalClass {
            width: 100%;
          }

          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }

          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }

          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
        }
      </style>
    </head>
    <body>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
          ${content}
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>`;
}
