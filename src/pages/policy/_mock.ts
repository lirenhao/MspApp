import { Request, Response } from 'express';

function getPolicy(_: Request, res: Response) {
  return res.json({
    title: 'BOC Merchant Portal Policy',
    content: `
<h2>1. Introduction</h2>
<p> This Web Site is provided to you under these Terms and any amendment or supplement thereto that may be posted by us
  from time to time (collectively referred to as “these Terms”). Your use of this Web Site shall be deemed to constitute
  your consent to be bound by these Terms</p>
<h2>2. Terms and Conditions of NETS Web Site</h2>
<p> All Terms and Conditions stated in our NETS Web Site (“NETS Web Site Terms”) constitute an integral part of these
  Terms and shall be deemed incorporated into these Terms. We suggest you click to the NETS Web Site at www.nets.com.sg
  and read the NETS Web Site Terms carefully.</p>
<h2>3. Modifications to these Terms and NETS Web Site Terms</h2>
<p> We may make changes to these Terms or the NETS Web Site Terms from time to time at our sole discretion, and we will
  post any such changes on this Web Site or the NETS Web Site respectively. Each time changes are made to these Terms or
  the NETS Web Site Terms, notice of these changes will be posted on the respective home page. Your continued use of
  this Web Site following the posting of changes constitutes your acceptance of any such changes.</p>
<h2>4. Privacy Policy</h2>
<p> The information that we obtain through your use of this Web Site, whether through the registration process or
  otherwise, is subject to the following Privacy Policy:</p>
<p> (a) You agree and consent that we may, at our sole discretion, disclose to any third party and information relating
  to or supplied by you which is in our possession or control.</p>
<p> (b) You agree and consent that we may incorporate your personal information in our mailing lists to disseminate any
  promotion, offer, newsletter or marketing material from us or from our business partners through us.</p>
<p> (c) You agree and consent that we may disclose your personal information, if required to do so by law, or in good
  faith believe that such action is necessary to (i) conform to edicts of the law or comply with legal process or
  directives of regulatory authorities or (ii) protect and defend our rights and property.</p>
<p> (d) You acknowledge that the information collected by us will be used to provide the services or products in
  connection with our MerchantConnect Portal and you agree that we may engage third parties to provide certain services
  on our behalf.</p>
<h2>5. Application and Registration</h2>
<p> You have to apply and register with us in order to use the Web Site. You must submit the completed MerchantConnect
  Application Form to us for processing.</p>
<p> You agree to provide true, accurate and complete registration information and to maintain and promptly update your
  information. You shall not impersonate any person or use a name other than your own. You authorise us to make such
  inquiries as we consider necessary to validate your registration.</p>
<h2>6. Acceptance of Terms and Conditions</h2>
<p> If you do not wish to accept or do not agree with these Terms, the NETS Web Site Terms, our Privacy Policy or fee
  and charges, you should not register or if you have registered, de-register the use of this Web Site.</p>
<h2>7. Fees and Charges</h2>
<p> You may apply for multiple Customer-Code Accounts or Retailer-Code Accounts. There is no charge for one
  Customer-Code Account but charges will be payable in respect of subsequent Customer-Code Accounts and all
  Retailer-Code Accounts.</p>
<p> We reserve the right to levy other fees and charges from time to time.</p>
<h2>8. MerchantConnect Portal</h2>
<p> The MerchantConnect Portal allows you access to your transaction data for EFTPOS, CashCard, CashBack, UnionPay (CUP)
  and Rintis-BCA and such other services as we may include from time to time.</p>
<p> You will have access to the following reports:</p>
<p> (a) Monthly invoice and Daily Transaction Report;</p>
<p> (b) Monthly Transaction by Retailer;</p>
<p> (c) Daily Transaction Summary;</p>
<p> (d) Such other reports as we may include from time to time.</p>
<p> However, we reserve the right, at our sole discretion, to remove or add to the foregoing services or reports at any
  time.</p>
<p></p>
<h2>9. Access to MerchantConnect Portal</h2>
<p> We endeavour to provide access to the MerchantConnect Portal on a 24-hour basis, but there will be periods when
  access is not available or delayed due to breakdown, maintenance, upgrading or other technical reasons.</p>
<p> We shall in no event be liable for any damage, loss or expense including without limitation, special damage, or
  consequential damage, or economic loss arising from or in connection with:</p>
<p> (a) any access, use or the delay or inability to access or use this Web Site, or reliance on any information
  contained in this Web Site;</p>
<p> (b) any system, server or connection failure, error, omission, interruption, delay in transmission or computer
  failure;</p>
<p> (c) any use of or access to any other web site linked to this Web Site;</p>
<p> (d) any service, product, information, date, software or other material obtained from this Web Site or from any
  other web site linked to this Web Site;</p>
<p> even if we are advised of the possibility of such damages, losses and expenses and your sole remedy is to
  de-register or discontinue use of the Web Site. This exclusion clause shall have effect to the fullest extent
  permitted by law.</p>
<h2>10. Unauthorised Access</h2>
<p> It is very important that you notify NETS immediately if you have reason to suspect or believe that there has been
  unauthorised access to your account.</p>
<h2>11. Receiving Information</h2>
<p> You agree that we have the right to send you any information via any media once you register. Your consent to
  receive information electronically or via other media is valid until you de-register.</p>
<h2>12. Ownership</h2>
<p> This Web site is owned by us. All right and title to, and interest in the content displayed on this Web Site,
  including but not limited to this Web Site''s look and feel, data, information, text, graphics, /images, sound or
  video materials, designs, trademarks, service marks, trade names, and URL, are our property or the property of our
  respective partners, agents, or third parties as the case may be.</p>
<h2>13. Electronic Communications</h2>
<p> The information communicated on this Web Site constitutes an electronic communication. When you communicate with us
  through this Web Site or via other forms of electronic media, such as e-mail, you are communicating with us
  electronically. You agree that we may communicate electronically and that such communications, as well as notices,
  disclosures, agreements, and other communications that we provide to you electronically, are equivalent to
  communications in writing and shall have the same force and effect as if they were in writing and signed by the party
  sending the communication.</p>
<h2>14. Compliance With Laws</h2>
<p> You agree to comply with all applicable local laws regarding your use of this Web Site, including, without
  limitation, laws regarding import or export of technical data by virtue of your online transmission.</p>
<h2>15. Information Disclaimer</h2>
<p> Your use of this Web Site is subject to the additional conditions, disclaimers and caveats that may appear
  throughout this Web Site. We assume no responsibility for any consequence relating directly or indirectly to any
  action or inaction you take based on the information, services or other material on this Web Site. While we strive to
  keep the information on this Web Site accurate, complete and up-to-date (but not real-time), we cannot guarantee, and
  will not be responsible for, any damage or loss related to the accuracy, completeness or timeliness of the
  information.</p>
<h2>16. Disclaimer of Warranties With Respect to Use of Web Site</h2>
<p> This Web Site is provided on an “as is” and “as available” basis. Except as specifically provided herein, to the
  fullest extent permissible pursuant to applicable law, we expressly disclaim all warranties of any kind, whether
  express or implied, including, without limitation, any warranties of merchantability, fitness for a particular purpose
  and non-infringement.</p>
<p> We do not make any warranty that this Web Site will meet your requirements or that access to the Web Site will be
  uninterrupted, timely, secure or error-free, or that defects, if any, will be corrected. We make no warranties as to
  the results that may be obtained from the use of this Web Site or as to the accuracy, quality, or reliability of any
  information obtained through this Web Site.</p>
<p> You understand and agree that any material or data downloaded or otherwise obtained through the use of the Web Site
  is used at your own risk and that you will be solely responsible for any damage to your computer system or loss of
  data that results from the download of such material or data.</p>
<p> No advice or information, whether oral or written, obtained by you from us or through this Web Site shall create any
  warranty not expressly made herein.</p>
`,
  });
}

export default {
  'GET /svc/msp/policy': getPolicy,
};
