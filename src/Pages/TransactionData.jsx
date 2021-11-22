import React from 'react';
import { Card, CardBody } from 'reactstrap';
import BuySellWeeklyChart from '../components/BuySellWeekly';
import DepositChart from '../components/DepositWeekly';
import NewUsers from '../components/NewUsers';

function TransactionData() {
  return (
    <div>
      <div className='row'>
        <Card
          style={{
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            marginTop: '10px',
          }}>
          <CardBody>
            <BuySellWeeklyChart />
          </CardBody>
        </Card>
      </div>
      <div className='row'>
        <Card
          style={{
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            marginTop: '10px',
          }}>
          <CardBody>
            <DepositChart />
          </CardBody>
        </Card>
      </div>
      <div className='row'>
        <Card
          style={{
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            marginTop: '10px',
          }}>
          <CardBody><NewUsers /></CardBody>
        </Card>
      </div>
    </div>
  );
}

export default TransactionData;
