import {Resend} from 'resend';
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env

const resendApiKey = process.env.RESEND_API_KEY;
const mailFrom = process.env.MAIL_FROM || process.env.MAIL_ADDRESS;
const mailTo = process.env.MAIL_TO || process.env.MAIL_ADDRESS;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendMail(formData) {
  if (!resend || !mailFrom || !mailTo) {
    const error = new Error('Resend no está configurado.');
    // @ts-expect-error: añadimos código de error
    error.code = 'MAIL_NOT_CONFIGURED';
    throw error;
  }

  const template = `
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation">
  <tbody>
      <tr>
          <td style="background-color:#ffffff;background-position:center;background-repeat:no-repeat;background-size:cover"
              class="mceWrapperInner" valign="top">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"
                  data-block-id="12">
                  <tbody>
                      <tr class="mceRow">
                          <td style="background-position:center;background-repeat:no-repeat;background-size:cover"
                              valign="top">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                  <tbody>
                                      <tr>
                                          <td style="padding-top:0;padding-bottom:0" class="mceColumn"
                                              data-block-id="-4" valign="top" colspan="12" width="100%">
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                  role="presentation">
                                                  <tbody>
                                                      <tr>
                                                          <td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px"
                                                              class="mceBlockContainer" valign="top">
                                                              <div data-block-id="5" class="mceText"
                                                                  id="dataBlockId-5" style="width:100%">
                                                                  <h1>New client
                                                                      interested!</h1>
                                                                  <p>This are the details collected by WebKnock:</p>
                                                                  <p>First Name: ${formData.firstName}</p>
                                                                  <p>Last Name: ${formData.lastName}</p>
                                                                  <p>Email: ${formData.email}</p>
                                                                  <p>Phone Number: ${formData.phone}</p>
                                                                    <p>classType: ${formData?.classType}</p>
                                                                    <p>ageGroup: ${formData?.ageGroup}</p>
                                                                  <p><br></p>
                                                                
                                                              </div>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td style="padding-top:8px;padding-bottom:8px;padding-right:8px;padding-left:8px"
                                                              class="mceLayoutContainer" valign="top">
                                                              <table align="center" border="0" cellpadding="0"
                                                                  cellspacing="0" width="100%" role="presentation"
                                                                  data-block-id="11"
                                                                  id="section_93adbc98eeb96e5a4cdab6dab65405f8"
                                                                  class="mceFooterSection">
                                                                  <tbody>
                                                                      <tr class="mceRow">
                                                                          <td style="background-position:center;background-repeat:no-repeat;background-size:cover"
                                                                              valign="top">
                                                                              <table border="0" cellpadding="0"
                                                                                  cellspacing="12" width="100%"
                                                                                  role="presentation">
                                                                                  <tbody>
                                                                                      <tr>
                                                                                          <td style="padding-top:0;padding-bottom:0;margin-bottom:12px"
                                                                                              class="mceColumn"
                                                                                              data-block-id="-3"
                                                                                              valign="top"
                                                                                              colspan="12"
                                                                                              width="100%">
                                                                                              <table border="0"
                                                                                                  cellpadding="0"
                                                                                                  cellspacing="0"
                                                                                                  width="100%"
                                                                                                  role="presentation">
                                                                                                  <tbody>
                                                                                                      <tr>
                                                                                                          <td style="padding-top:12px;padding-bottom:12px;padding-right:16px;padding-left:16px"
                                                                                                              class="mceBlockContainer"
                                                                                                              align="center"
                                                                                                              valign="top">
                                                                                                              <div data-block-id="9"
                                                                                                                  class="mceText"
                                                                                                                  id="dataBlockId-9"
                                                                                                                  style="display:inline-block;width:100%">
                                                                                                                  <p
                                                                                                                      class="last-child">
                                                                                                                      <br>
                                                                                                                  </p>
                                                                                                              </div>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td class="mceLayoutContainer"
                                                                                                              align="center"
                                                                                                              valign="top">
                                                                                                              <table
                                                                                                                  align="center"
                                                                                                                  border="0"
                                                                                                                  cellpadding="0"
                                                                                                                  cellspacing="0"
                                                                                                                  width="100%"
                                                                                                                  role="presentation"
                                                                                                                  data-block-id="-2">
                                                                                                                  <tbody>
                                                                                                                      <tr
                                                                                                                          class="mceRow">
                                                                                                                          <td style="background-position:center;background-repeat:no-repeat;background-size:cover"
                                                                                                                              valign="top">
                                                                                                                              <table
                                                                                                                                  border="0"
                                                                                                                                  cellpadding="0"
                                                                                                                                  cellspacing="0"
                                                                                                                                  width="100%"
                                                                                                                                  role="presentation">
                                                                                                                                  <tbody>
                                                                                                                                      <tr>
                                                                                                                                          <td class="mceColumn"
                                                                                                                                              data-block-id="-5"
                                                                                                                                              valign="top"
                                                                                                                                              colspan="12"
                                                                                                                                              width="100%">
                                                                                                                                              <table
                                                                                                                                                  border="0"
                                                                                                                                                  cellpadding="0"
                                                                                                                                                  cellspacing="0"
                                                                                                                                                  width="100%"
                                                                                                                                                  role="presentation">
                                                                                                                                                  <tbody>
                                                                                                                                                      <tr>
                                                                                                                                                          <td align="center"
                                                                                                                                                              valign="top">
                                                                                                                                                              <div>
                                                                                                                                                                  <div
                                                                                                                                                                      data-block-id="10">
                                                                                                                                                                      <a href="http://eepurl.com/iGb23o"
                                                                                                                                                                          target="_blank"
                                                                                                                                                                          rel="noopener noreferrer"></a>
                                                                                                                                                                  </div>
                                                                                                                                                              </div>
                                                                                                                                                          </td>
                                                                                                                                                      </tr>
                                                                                                                                                  </tbody>
                                                                                                                                              </table>
                                                                                                                                          </td>
                                                                                                                                      </tr>
                                                                                                                                  </tbody>
                                                                                                                              </table>
                                                                                                                          </td>
                                                                                                                      </tr>
                                                                                                                  </tbody>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </tbody>
                                                                                              </table>
                                                                                          </td>
                                                                                      </tr>
                                                                                  </tbody>
                                                                              </table>
                                                                          </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </td>
      </tr>
  </tbody>
</table>
  `;

  const {data, error} = await resend.emails.send({
    from: mailFrom,
    to: mailTo,
    subject: 'Registro de cliente',
    html: template,
    reply_to: formData.email,
  });

  if (error) {
    const err = new Error(error.message);
    err.name = error.name || 'MailSendError';
    // @ts-expect-error: propagamos el código/status si existe
    err.code = error.statusCode || error.code;
    throw err;
  }

  return {
    messageId: data?.id,
    accepted: mailTo ? [mailTo] : [],
    rejected: [],
  };
}
