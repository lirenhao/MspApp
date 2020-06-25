import { Request, Response } from 'express';

function getPolicy(_: Request, res: Response) {
  return res.json({
    title: 'BOC Merchant Portal Policy',
    content: `
<p>
  中国银行股份有限公司苏州分行无感支付业务协议
  委托代扣申请人(以下简称甲方)与中国银行(以下简称乙方)双方就甲方委托乙方办理无感支付事宜达成<br />
  如下协议:
</p>

<h2>一、无感支付</h2>
<p>
  乙方推出的无感支付业务，旨在方便广大客户，适用于已经和乙方开通无感支付或后续即将开通无感支付的停车场、加油站、加气站、充电桩、汽渡公司等乙方合作商户。
  乙方提供的无感支付服务是甲方通过与乙方签订本协议，将甲方在乙方开立的账户（下称“甲方签约账户”）与“智慧停车”商户进行绑定，绑定完成后即可在“智慧停车”内所签约的合作商户方(含手机应用)完成直接付款业务。甲方授权乙方在收到商户端发送的划拨甲方签约账户资金的支付指令后，直接依据该指令实时扣减甲方签约账户内的余额进行支付。
</p>

<h2>
  二、业务内容
</h2>
<p>
  1、甲方可通过乙方手机银行或其他渠道(后续简称渠道)办理相关无感支付的开通、关闭和银行卡号更新的服务申请，并可通过乙方渠道查询业务处理状态。<br />
2、甲方如果要更改原无感支付协议中的相关信息，要先解除原无感支付协议，待解约正式生效后，再重新签署新的协议。<br />
3、本协议生效之日起，乙方将根据甲方在乙方提供的可进行无感支付业务或后续即将开通无感支付的停车场、加油站、加气站、充电桩、汽渡公司等乙方合作商户提供的应缴费金额，及时从甲方的银行卡内扣相应的费用。<br />
4、若甲方在乙方开通账户短信通知服务，则甲方扣款情况，乙方都会以短信的形式通知甲方，如因甲方未及时更新在乙方留存的手机号码而未收到乙方的短信通知，相关责任由甲方负责;若甲方未在乙方开通账户短信通知服务，甲方可以通过手机银行、个人网银自助开通。<br />
5、甲方银行卡因未激活、止付、冻结、挂失未补卡、信用卡到期未续卡或销卡等卡状态异常原因导致的卡片停止使用期间，无感支付交易将会失败。甲方应及时通过其他方式自行缴费。<br />
6、乙方合作商户负责其用户欠费的催讨和缴费数据的解释，并负责其用户缴费收据或发票的寄送，乙方概不负责。<br />
</p>

<h2>三、双方的权利和义务</h2>
<p>
  1、如甲方签约无感支付的银行卡已在其他APP或应用程序签约了无感支付业务，应注销后再另行开通乙方的无感支付业务。因甲方未按上述流程操作造成重复扣款或漏扣款的相关责任由甲方承担。<br />
  2、甲方应按照乙方规定的渠道签约程序向乙方提交签约资料并对提交资料的真实性、准确性和合法性负责。因甲方提交资料有误等原因造成签约不成功或影响签约生效时间的，相关责任由甲方负责。<br />
  3、甲方应保证签约银行卡在无感支付开通项目缴费期间内有足够的余额或信用额度用于扣缴。余额或信用卡额度不足时，甲方应及时补充，乙方不作部分扣缴、不垫款。<br />
  4、如甲方签约无感支付项目的客户编号(如:客户车牌号码、手机号码等)发生过户或变更时，请及时通过乙方渠道办理无感支付解约，否则原客户编号的费用仍将从甲方的银行卡中支付，由此引起的甲方经济损失乙方不予承担。<br />
  5、甲方必须依照乙方合作商户的有关规定承担欠费补缴的责任。<br />
  6、甲方可通过乙方手机银行无感支付页面或中国银行苏州分行官方微信查询无感支付交易记录，但乙方不负责向甲方提供有关收费具体情况的发票并转送甲方。<br />
  7、乙方对于甲方与乙方合作商户之间就费用金额产生的纠纷不承担任何责任。<br />
  8、在无感支付过程中，如出现差错，甲乙双方应密切配合查明原因。因甲方的过错造成的损失，由甲方承担责任;因乙方的过错造成的损失，由乙方承担责任;因双方的过错造成的损失，由双方按过错的程度承担相应的责任。
</p>

<h2>
  四、合作期限
</h2>
<p>
  1、本协议自甲方在签约无感支付页面点击”我已阅读并同意”按钮后生效，至无感支付解约时终止。<br />
  2、在甲方解约前乙方接收到的所有收费指令仍为有效指令，由甲方承担责任。
</p>

<h2>五、违约</h2>
<p>双方承认，任何一方对本协议的任何违反都将给对方造成损失。如果一方违约，遵守协议的另-方有权获得赔偿</p>

<h2>六、争议的解决</h2>
<p>在发生因履行本协议而引起的或与本协议有关的争议时，双方应首先通过友好协商解决争议。协商不成的，可向乙方所在地人民法院提起诉讼。</p>

<h2>七、保密</h2>
<p>甲乙双方对另一方提供的信息、资料及本合同的具体内容负有保密责任，对任何一方因违反保密责任造成的损失。而引发的纠纷，由过错方承担责任。</p>
`,
  });
}

export default {
  'GET /svc/msp/policy': getPolicy,
};
