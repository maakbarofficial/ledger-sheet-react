
function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="title-container">
          <h1>KMK Communication</h1>
        </div>
        <div className="time-actions-container">
          <div id="current-date" className="date" />
          <div id="current-time" className="time" />
          <div className="actions">
            <button id="theme-toggle" className="button">
              Change Theme
            </button>
            <button className="button">Save as PDF</button>
            <button className="button">Save Locally</button>
            <button className="button">Sync</button>
            <button id="clear-sheet" className="button-danger">
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="eload-accounts-container">
        <div>
          <div className="easyload-container">
            <div className="easyload">
              {/* Easyload */}
              <table>
                <tbody>
                  <tr>
                    <th />
                    <th>Telenor</th>
                    <th>Jazz</th>
                    <th>Ufone</th>
                    <th>Zong</th>
                  </tr>
                  <tr>
                    <td>Opening Balance</td>
                    <td>
                      <input type="number" id="telenor-opening-balance" />
                    </td>
                    <td>
                      <input type="number" id="jazz-opening-balance" />
                    </td>
                    <td>
                      <input type="number" id="ufone-opening-balance" />
                    </td>
                    <td>
                      <input type="number" id="zong-opening-balance" />
                    </td>
                  </tr>
                  <tr>
                    <td>New Balance</td>
                    <td>
                      <input type="number" id="telenor-new-balance" />
                    </td>
                    <td>
                      <input type="number" id="jazz-new-balance" />
                    </td>
                    <td>
                      <input type="number" id="ufone-new-balance" />
                    </td>
                    <td>
                      <input type="number" id="zong-new-balance" />
                    </td>
                  </tr>
                  <tr>
                    <td>Reversal Balance</td>
                    <td>
                      <input type="number" id="telenor-reversal-balance" />
                    </td>
                    <td>
                      <input type="number" id="jazz-reversal-balance" />
                    </td>
                    <td>
                      <input type="number" id="ufone-reversal-balance" />
                    </td>
                    <td>
                      <input type="number" id="zong-reversal-balance" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Rs</td>
                    <td>
                      <input type="number" id="telenor-total-rs" disabled="" />
                    </td>
                    <td>
                      <input type="number" id="jazz-total-rs" disabled="" />
                    </td>
                    <td>
                      <input type="number" id="ufone-total-rs" disabled="" />
                    </td>
                    <td>
                      <input type="number" id="zong-total-rs" disabled="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Closing Balance</td>
                    <td>
                      <input type="number" id="telenor-closing-balance" />
                    </td>
                    <td>
                      <input type="number" id="jazz-closing-balance" />
                    </td>
                    <td>
                      <input type="number" id="ufone-closing-balance" />
                    </td>
                    <td>
                      <input type="number" id="zong-closing-balance" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total ELoad Sell</td>
                    <td>
                      <input
                        type="number"
                        id="telenor-total-eload-sell"
                        disabled=""
                      />
                    </td>
                    <td>
                      <input type="number" id="jazz-total-eload-sell" disabled="" />
                    </td>
                    <td>
                      <input
                        type="number"
                        id="ufone-total-eload-sell"
                        disabled=""
                      />
                    </td>
                    <td>
                      <input type="number" id="zong-total-eload-sell" disabled="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="eload-summery mx">
              {/* ELoad Summery */}
              <table>
                <tbody>
                  <tr>
                    <th colSpan={2}>Easyload Summery</th>
                  </tr>
                  <tr>
                    <td>Telenor</td>
                    <td>
                      <input type="number" id="telenor-eload-summery" disabled="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Jazz</td>
                    <td>
                      <input type="number" id="jazz-eload-summery" disabled="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Ufone</td>
                    <td>
                      <input type="number" id="ufone-eload-summery" disabled="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Zong</td>
                    <td>
                      <input type="number" id="zong-eload-summery" disabled="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Load</td>
                    <td>
                      <input type="number" id="eload-summery-total" disabled="" />
                    </td>
                  </tr>
                  <tr>
                    <td>AD</td>
                    <td>
                      <input type="number" id="eload-summery-ad" disabled="" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>
                      <input
                        type="number"
                        id="eload-summery-total-sell"
                        disabled=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="accounts-container space-y">
            <div className="accounts">
              {/* Accounts */}
              <table>
                <tbody>
                  <tr>
                    <th>Accounts</th>
                    <th>265999891</th>
                    <th>266001445</th>
                    <th>37300247</th>
                    <th>257283991</th>
                  </tr>
                  <tr>
                    <td>Rs</td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                  </tr>
                  <tr>
                    <td>Deposit</td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Rs</td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                  </tr>
                  <tr>
                    <td>Withdrawl</td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                  </tr>
                  <tr>
                    <td>Remaining Balance</td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                    <td>
                      <input type="number" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cards mx">
              {/* Cards */}
              <table>
                <tbody>
                  <tr>
                    <th colSpan={2}>Cards</th>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>
                      <input type="number" id="total-cards" />
                    </td>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>
                      <input type="number" id="sell-cards" />
                    </td>
                  </tr>
                  <tr>
                    <td>Remaining</td>
                    <td>
                      <input type="number" id="remaining-cards" disabled="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="borrow-recovery-container">
          <div className="borrow-container">
            {/* Borrow */}
            <table>
              <tbody>
                <tr>
                  <th colSpan={2}>Borrow</th>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    <input type="number" id="total-borrow" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="recovery-container">
            {/* Recovery */}
            <table>
              <tbody>
                <tr>
                  <th colSpan={2}>Recovery</th>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="statements-container">
        <div className="ubl-omni">
          {/* Statements */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>UBL Omni</th>
              </tr>
              <tr>
                <td>Balance</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Sending</td>
                <td>Receiving</td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="easypaisa">
          {/* Statements */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>EasyPaisa</th>
              </tr>
              <tr>
                <td>Balance</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Sending</td>
                <td>Receiving</td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="jazzcash">
          {/* Statements */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>JazzCash</th>
              </tr>
              <tr>
                <td>Balance</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Sending</td>
                <td>Receiving</td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ep-account">
          {/* Statements */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>EP Account 0333</th>
              </tr>
              <tr>
                <td>Balance</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Sending</td>
                <td>Receiving</td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="jc-account">
          {/* Statements */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>JC Account 0307</th>
              </tr>
              <tr>
                <td>Balance</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Sending</td>
                <td>Receiving</td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="purchasing">
          {/* Purchasing */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>Purchasing</th>
              </tr>
              <tr>
                <td className="text-sm">UBL Omni Rec</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td className="text-sm">EasyPaisa Rec</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td className="text-sm">JazzCash Rec</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td className="text-sm">EP AC 0333 Rec</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td className="text-sm">EP AC 0304 Rec</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td className="text-sm">JC AC 0307 Rec</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="analytics-container">
        <div className="cash-detail">
          {/* Cash Detail */}
          <table>
            <tbody>
              <tr>
                <th colSpan={4}>Cash Detail</th>
              </tr>
              <tr>
                <td>5000</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>1000</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>500</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>100</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>50</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>20</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>x</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Total</td>
                <td>
                  <input type="number" disabled="" defaultValue={123} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="analytics">
          {/* Analytics */}
          <table>
            <tbody>
              <tr>
                <td>Previous Cash</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Today Cash</td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>Recovery &amp; Purchasing</td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr>
                <td>Remaining Cash</td>
                <td>
                  <input type="number" disabled="" />
                </td>
              </tr>
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr />
              <tr>
                <td className="text-lg">Difference</td>
                <td>
                  <input
                    className="text-lg"
                    type="number"
                    defaultValue={34}
                    readOnly=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="red-book">
          {/* RED Book */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>RED Book</th>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cash-info">
          {/* Cash Info */}
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>Cash Info</th>
              </tr>
              <tr>
                <td>UBL Omni</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>EasyPaisa</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>JazzCash</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>EasyPaisa &amp; JazzCash Accounts</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Recovery</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Card</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>EasyLoad</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Extra</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
