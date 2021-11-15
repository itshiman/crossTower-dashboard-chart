import React from 'react'
import BuySellMonthlyChart from '../components/BuySellMonthly'
import BuySellWeeklyChart from '../components/BuySellWeekly'
import DepositChart from '../components/DepositWeekly'
import DepositChartMonthly from '../components/DepositWithdrawMonthly'


function TransactionData() {
  return (
    <div>
      <BuySellWeeklyChart />
      <BuySellMonthlyChart />
      <DepositChart />
      <DepositChartMonthly/>
    </div>
  )
}

export default TransactionData
