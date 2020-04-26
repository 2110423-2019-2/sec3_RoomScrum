import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import config from 'src/config';
import {
  HireeEventStatusIndicator,
  PaymentStatusIndicator,
  ContractStatusIndicator,
  ContractStatusColorIndicator,
} from 'src/components/event-item/status-indicator/status-indicator';
import {
  calculateHireeEventColor,
  calculateHireeEventStatus,
  calculateHirerEventStatus,
  calculateHirerEventColor,
} from 'src/components/event-item/status-indicator/status-indicator';

const ContractModal = styled.div`
  background-color: #fcfcfc;
  overflow: scroll;
  padding: 50px;
  min-width: 900px;
  h1 {
    text-align: center;
    color: #364d9b;
    font-size: 40px;
    font-weight: bold;
  }
  .grey {
    color: #939393;
  }
  .grey:hover {
    cursor: pointer;
  }
`;

const Contract = ({ eventId, application }) => {
  // const [contractInfo, setContractInfo] = useState();
  // const [isFetch, setIsFetch] = useState(false);

  // const [hiree, setHiree] = useState();
  const hiree = '-';
  // const getEvents = () => {
  //   return new Promise((resolve, reject) => {
  //     request
  //       .get(`${config.API_URL}/contract/${eventId}`)
  //       .withCredentials()
  //       .then((res) => {
  //         setIsFetch(true);
  //         setContractInfo(res.body);
  //         // console.log(res.body);
  //         resolve(res.body);
  //       })
  //       .catch((err) => {
  //         alert(err);
  //         resolve(contractInfo);
  //       });
  //   });
  // };

  // if (!isFetch) {
  //   getEvents().then((contract) => {
  //     setStatus(contract.status);
  //     setEventName(contract.event.eventName);
  //     setHirer(contract.hirer.firstName + ' ' + contract.hirer.lastName);
  //     try {
  //       setHiree(contract.hiree.firstName + ' ' + contract.hiree.lastName);
  //     } catch (error) {}
  //     setBudget(contract.price);
  //     setDescription(contract.description);
  //     console.log('end');
  //   });
  // }
  const {
    contract: contract,
    event: {
      eventName,
      // eventId,
      district,
      province,
      userId: hirerId,
      price,
      user: {
        // hirer
        firstName: hirerFirstName,
        lastName: hirerLastName,
      },
    },
  } = application;

  console.log(application);

  return (
    <div>
      <ContractModal className='container-sm position-relative'>
        <h1>Contract</h1>
        <br />
        <div className='row'>
          <div className='label col-3'>Contract status</div>
          <div className='col-9'>
            <ContractStatusIndicator contractStatus={contract.status} />
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Event name</div>
          <div className='col-9'>{eventName}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hirrer</div>
          <div className='col-9'>
            {hirerFirstName} {hirerLastName}
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hiree</div>
          <div className='col-9'>{hiree}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Budget</div>
          <div className='col-9'>{price.toLocaleString()}</div>
        </div>
        <div className='row '>
          <div className='label col-3'>Detail</div>
          <div className='col-9'>{contract.description || '-'}</div>
        </div>
      </ContractModal>
    </div>
  );
};

export default Contract;
