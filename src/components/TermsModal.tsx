import React, { useRef } from 'react';
import styled from 'styled-components';

interface TermsModalProps {
  onClose: () => void;
  content: string;
}

const termsContent = `
<strong>숙소 이용규칙 및 취소/환불규정 동의 (필수)</strong>

이용규칙
- 19세 미만 청소년의 혼숙은 법적으로 불가하며, 이에 대한 숙소의 입실 거부 시 취소/환불이 불가합니다.
- 19세 미만 청소년 예약에 대한 숙소의 입실 거부 시 취소/환불이 불가하오니, 예약 전 반드시 숙소에 확인하시기 바랍니다.
- 최대 인원 초과 시 입실 불가합니다.
- 제공 이미지는 배정된 객실과 다를 수 있습니다.
- 제공된 정보는 숙소의 사정에 따라 변경될 수 있습니다.
- 객실 타입이나 시간이 별도로 기재된 경우, 체크인/아웃 시간이 상이할 수 있습니다.
- 업체 현장에서 객실 컨디션 및 서비스로 인해 발생된 분쟁은 여기죽이지에서 책임지지 않습니다.

취소/환불규정
- 숙소 사정에 의해 취소 발생 시 100% 환불이 가능합니다.
- 모텔의 경우 예약/결제 직후 1시간 이내에는 100% 취소/환불 가능 합니다. 단, 1시간 이내라고 하더라도 입실(체크인) 시간을 경과한 경우에는 취소 불가 합니다. 만약, 예약 당시 이미 체크인 시간을 경과한 경우에는 예약/결제 직후 15분 이내에만 취소 가능합니다.
- 취소/환불 불가 모텔인 경우, 상기 예약/결제 직후 1시간 또는 15분 이내에 취소 가능 정책이 동일하게 적용되나, 앱/웹내에서 취소 불가하며 고객행복센터에 전화를 통해 취소를 요청할 수 있습니다.
- 취소/환불 가능 모텔인지, 불가 모텔인지 여부는 숙소의 정책을 따릅니다.
- 취소/환불 규정에 따라 취소 수수료가 발생할 경우, 취소 수수료는 판매가(상품가격) 기준으로 계산됩니다.
`;

const privacyContent = `
<strong>개인정보 수집 및 이용 (필수)</strong>

<table>
  <thead>
    <tr>
      <th>구분</th>
      <th>수집 목적</th>
      <th>수집 항목</th>
      <th>보유 및 이용기간</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>예약·구매</td>
      <td>예약자 정보(이름, 휴대전화번호)</td>
      <td>예약/구매 서비스 제공 상담 및 부정거래 기록 확인</td>
      <td>회원 탈퇴 시까지<br/>관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기간까지 보유</td>
    </tr>
    <tr>
      <td>결제</td>
      <td>거래내역</td>
      <td>거래명세서 발급<br/>이메일주소</td>
      <td>회원 탈퇴 시까지<br/>관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기간까지 보유</td>
    </tr>
    <tr>
      <td>현금영수증 발급</td>
      <td>휴대전화번호, 이메일주소</td>
      <td>회원 탈퇴 시까지<br/>관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기간까지 보유</td>
    </tr>
    <tr>
      <td>취소·환불</td>
      <td>은행명, 계좌번호, 예금주명</td>
      <td>회원 탈퇴 시까지<br/>관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기간까지 보유</td>
    </tr>
  </tbody>
</table>

* 위 동의 내용을 거부하실 수 있으나, 동의를 거부하실 경우 서비스를 이용하실 수 없습니다.
* 개인정보 처리와 관련된 상세 내용은 '개인정보처리방침'을 참고하시기 바랍니다.
`;

const ageLimitContent = `
  <strong>만 14세 이상 확인 (필수)</strong>

  <span style="color: red;">여기죽이지는 <strong>만 14세 미만 아동 서비스 이용을 제한</strong>하고 있습니다.</span>

  개인정보 보호법에는 만 14세 미만 아동의 개인정보 수집 시 법정대리인 동의를 받도록 규정하고 있으며, <strong>만 14세 미만 아동이 법정대리인 동의없이 서비스 이용이 확인된 경우 서비스 이용이 제한될 수 있음을 알려드립니다.</strong>
`;

const TermsModal = ({ onClose, content }: TermsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const getContent = () => {
    switch (content) {
      case 'terms':
        return termsContent;
      case 'privacy':
        return privacyContent;
      case 'age':
        return ageLimitContent;
      default:
        return '';
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent ref={modalRef}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Content
          dangerouslySetInnerHTML={{
            __html: getContent(),
          }}
        />
      </ModalContent>
    </ModalOverlay>
  );
};

export default TermsModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 650px;
  max-width: 90%;
  max-height: 50rem;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
  font-size: 18px;
  line-height: 1.5;
  white-space: pre-wrap;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  span {
    color: red;
  }

  strong {
    font-weight: bold;
  }
`;
