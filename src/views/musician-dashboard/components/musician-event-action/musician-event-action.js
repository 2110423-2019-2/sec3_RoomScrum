import React from 'react';
import { EventStatus, ApplicationStatus, ContractStatus } from 'src/enums';
import './musician-event-action.scss';
import { CompleteEventButton } from 'src/components/action-buttons';
import AcceptPaymentButton from 'src/components/action-buttons/accept-payment-button';
import CancelEventButton from 'src/components/action-buttons/cancel-event-button';
import { PayByQRButton } from 'src/components/action-buttons/pay-by-qr-button';
import ApplyEventButton from 'src/components/action-buttons/apply-event-button';
import AcceptInvitationButton from 'src/components/action-buttons/accept-invitation-button';
import RejectInvitationButton from 'src/components/action-buttons/reject-invitation-button';
import { HireeContract } from 'src/components/contract';

// Hiree's event action
const MusicianEventAction = ({ application, refreshCallback, debug }) => {
  //   application.contract = {
  //     status: 'TEST',
  //   };
  if (application.event.contract) {
    application.contract = application.event.contract;
  } else {
    application.contract = { status: 'NotActive' };
  }

  const {
    eventId,
    status: applicationStatus,
    event: { status: eventStatus },
    contract: { status: contractStatus },
  } = application;

  const canCancel =
    debug ||
    eventStatus == EventStatus.CREATED ||
    eventStatus == EventStatus.HAVE_APPLICANT;
  const canAcceptPayment = debug || eventStatus == EventStatus.PAYMENT_PENDING;
  const canCompleteEvent = debug || eventStatus == EventStatus.SETTLE; // this should be on hirer!
  const canApply = debug || !applicationStatus;
  const canViewContract =
    debug || application.contract.status != ContractStatus.NOT_ACTIVE;

  return (
    <div className='musician-event-actions row'>
      {canCancel && (
        <CancelEventButton eventId={eventId} onSuccess={refreshCallback} />
      )}
      {canAcceptPayment && (
        <AcceptPaymentButton eventId={eventId} onSuccess={refreshCallback} />
      )}

      {canCompleteEvent && (
        <CompleteEventButton eventId={eventId} onSuccess={refreshCallback} />
      )}
      {canApply && (
        <ApplyEventButton eventId={eventId} onSuccess={refreshCallback} />
      )}
      {canViewContract && (
        <HireeContract eventId={eventId} application={application} />
      )}
    </div>
  );
};

export default MusicianEventAction;
