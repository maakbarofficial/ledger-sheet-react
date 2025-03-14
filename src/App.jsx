import { useEffect, useState } from "react";
import { useSheetStore, useThemeStore } from "./store";

function App() {
  const { theme, setTheme } = useThemeStore();
  const { sheet, setSheet } = useSheetStore();

  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    const getDateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = now.toLocaleDateString('en-GB', options).replace(/\//g, '-');

      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedTime = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

      setDateTime({ date: formattedDate, time: formattedTime });
    };

    getDateTime();
    const interval = setInterval(getDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTotalBalance = (network) => {
    return (
      (sheet?.[`${network}OpeningBalance`] || 0) +
      (sheet?.[`${network}NewBalance`] || 0) +
      (sheet?.[`${network}ReversalBalance`] || 0)
    );
  };

  const getTotalCards = () => {
    return (
      (sheet?.totalCards || 0) - (sheet?.sellCards || 0)
    )
  }

  const getTotalELoad = (network) => {
    return (
      getTotalBalance("telenor") + getTotalBalance("jazz") + getTotalBalance("ufone") + getTotalBalance("zong")
    );
  };

  const getTotalAccountBalance = (AccNo) => {
    return (
      (sheet?.[`deposit${AccNo}`] || 0) +
      (sheet?.[`accountBalance${AccNo}`] || 0))
  };

  const getRemainingAccountBalance = (AccNo) => {
    return (
      getTotalAccountBalance(AccNo) - (sheet?.[`withdrawl${AccNo}`] || 0))
  };

  const updateBorrowEntry = (index, field, value) => {
    const updatedBorrow = [...(sheet?.borrow || [])]; // Create a new array reference
    updatedBorrow[index] = { ...updatedBorrow[index], [field]: value }; // Update specific entry
    setSheet({ ...sheet, borrow: updatedBorrow }); // Update the sheet state
  };

  const getTotalBorrowed = () => {
    return (sheet?.borrow || []).reduce((sum, entry) => {
      return sum + (Number(entry?.amount) || 0);
    }, 0);
  };

  const updateRecoveryEntry = (index, field, value) => {
    const updatedRecovery = [...(sheet?.recovery || [])];
    updatedRecovery[index] = { ...updatedRecovery[index], [field]: value };
    setSheet({ ...sheet, recovery: updatedRecovery });
  };

  const getTotalRecovery = () => {
    return (sheet?.recovery || []).reduce((sum, entry) => {
      return sum + (Number(entry?.amount) || 0);
    }, 0);
  };
  return (
    <div className="container">
      <div className="header">
        <div className="title-container">
          <h1>KMK Communication</h1>
        </div>
        <div className="time-actions-container">
          <p id="current-date">{dateTime.date}</p>
          <p id="current-time">{dateTime.time}</p>
          <div className="actions">
            <button id="theme-toggle" className="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              Change Theme
            </button>
            <button className="button">Save as PDF</button>
            <button className="button">Save Locally</button>
            <button className="button">Sync</button>
            <button id="clear-sheet" className="button-danger" onClick={() => setSheet(null)}>
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
                      <input
                        type="number"
                        value={sheet?.telenorOpeningBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, telenorOpeningBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.jazzOpeningBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, jazzOpeningBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.ufoneOpeningBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, ufoneOpeningBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.zongOpeningBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, zongOpeningBalance: +e.target.value })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>New Balance</td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.telenorNewBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, telenorNewBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.jazzNewBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, jazzNewBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.ufoneNewBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, ufoneNewBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.zongNewBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, zongNewBalance: +e.target.value })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Reversal Balance</td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.telenorReversalBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, telenorReversalBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.jazzReversalBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, jazzReversalBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.ufoneReversalBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, ufoneReversalBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.zongReversalBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, zongReversalBalance: +e.target.value })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Rs</td>
                    <td><input type="number" disabled value={getTotalBalance("telenor")} /></td>
                    <td><input type="number" disabled value={getTotalBalance("jazz")} /></td>
                    <td><input type="number" disabled value={getTotalBalance("ufone")} /></td>
                    <td><input type="number" disabled value={getTotalBalance("zong")} /></td>
                  </tr>
                  <tr>
                    <td>Closing Balance</td>
                    <td>
                      <input type="number"
                        value={sheet?.telenorClosingBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, telenorClosingBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number"
                        value={sheet?.jazzClosingBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, jazzClosingBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number"
                        value={sheet?.ufoneClosingBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, ufoneClosingBalance: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number"
                        value={sheet?.zongClosingBalance || ""}
                        onChange={(e) => setSheet({ ...sheet, zongClosingBalance: +e.target.value })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Total ELoad Sell</td>
                    <td>
                      <input
                        type="number" disabled
                        value={
                          ((sheet?.telenorOpeningBalance || 0) +
                            (sheet?.telenorNewBalance || 0) +
                            (sheet?.telenorReversalBalance || 0)) - (sheet?.telenorClosingBalance || 0)
                        }
                      />
                    </td>
                    <td>
                      <input type="number" disabled
                        value={
                          ((sheet?.jazzOpeningBalance || 0) +
                            (sheet?.jazzNewBalance || 0) +
                            (sheet?.jazzReversalBalance || 0)) - (sheet?.jazzClosingBalance || 0)
                        } />
                    </td>
                    <td>
                      <input
                        type="number"
                        disabled
                        value={
                          ((sheet?.ufoneOpeningBalance || 0) +
                            (sheet?.ufoneNewBalance || 0) +
                            (sheet?.ufoneReversalBalance || 0)) - (sheet?.ufoneClosingBalance || 0)
                        }
                      />
                    </td>
                    <td>
                      <input type="number" disabled
                        value={
                          ((sheet?.zongOpeningBalance || 0) +
                            (sheet?.zongNewBalance || 0) +
                            (sheet?.zongReversalBalance || 0)) - (sheet?.zongClosingBalance || 0)
                        }
                      />
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
                      <input type="number" disabled value={getTotalBalance("telenor")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Jazz</td>
                    <td>
                      <input type="number" disabled value={getTotalBalance("jazz")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Ufone</td>
                    <td>
                      <input type="number" disabled value={getTotalBalance("ufone")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Zong</td>
                    <td>
                      <input type="number" disabled value={getTotalBalance("zong")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Load</td>
                    <td>
                      <input type="number" disabled value={getTotalELoad()} />
                    </td>
                  </tr>
                  <tr>
                    <td>AD</td>
                    <td>
                      <input type="number" disabled value={getTotalBorrowed()} />
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>
                      <input
                        type="number"
                        disabled
                        value={getTotalELoad() - getTotalBorrowed()}
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
                      <input type="number"
                        value={sheet?.accountBalance265999891 || ""}
                        onChange={(e) => setSheet({ ...sheet, accountBalance265999891: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number"
                        value={sheet?.accountBalance266001445 || ""}
                        onChange={(e) => setSheet({ ...sheet, accountBalance266001445: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number" value={sheet?.accountBalance37300247 || ""}
                        onChange={(e) => setSheet({ ...sheet, accountBalance37300247: +e.target.value })} />
                    </td>
                    <td>
                      <input type="number" value={sheet?.accountBalance257283991 || ""}
                        onChange={(e) => setSheet({ ...sheet, accountBalance257283991: +e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>Deposit</td>
                    <td>
                      <input type="number"
                        value={sheet?.deposit265999891 || ""}
                        onChange={(e) => setSheet({ ...sheet, deposit265999891: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number"
                        value={sheet?.deposit266001445 || ""}
                        onChange={(e) => setSheet({ ...sheet, deposit266001445: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number" value={sheet?.deposit37300247 || ""}
                        onChange={(e) => setSheet({ ...sheet, deposit37300247: +e.target.value })} />
                    </td>
                    <td>
                      <input type="number" value={sheet?.deposit257283991 || ""}
                        onChange={(e) => setSheet({ ...sheet, deposit257283991: +e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Rs</td>
                    <td>
                      <input type="number" disabled value={getTotalAccountBalance(265999891)} />
                    </td>
                    <td>
                      <input type="number" disabled value={getTotalAccountBalance(266001445)} />
                    </td>
                    <td>
                      <input type="number" disabled value={getTotalAccountBalance(37300247)} />
                    </td>
                    <td>
                      <input type="number" disabled value={getTotalAccountBalance(257283991)} />
                    </td>
                  </tr>
                  <tr>
                    <td>Withdrawl</td>
                    <td>
                      <input type="number"
                        value={sheet?.withdrawl265999891 || ""}
                        onChange={(e) => setSheet({ ...sheet, withdrawl265999891: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number"
                        value={sheet?.withdrawl266001445 || ""}
                        onChange={(e) => setSheet({ ...sheet, withdrawl266001445: +e.target.value })}
                      />
                    </td>
                    <td>
                      <input type="number" value={sheet?.withdrawl37300247 || ""}
                        onChange={(e) => setSheet({ ...sheet, withdrawl37300247: +e.target.value })} />
                    </td>
                    <td>
                      <input type="number" value={sheet?.withdrawl257283991 || ""}
                        onChange={(e) => setSheet({ ...sheet, withdrawl257283991: +e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>Remaining Balance</td>
                    <td>
                      <input type="number" disabled value={getRemainingAccountBalance(265999891)} />
                    </td>
                    <td>
                      <input type="number" disabled value={getRemainingAccountBalance(266001445)} />
                    </td>
                    <td>
                      <input type="number" disabled value={getRemainingAccountBalance(37300247)} />
                    </td>
                    <td>
                      <input type="number" disabled value={getRemainingAccountBalance(257283991)} />
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
                      <input type="number" value={sheet?.totalCards || ""}
                        onChange={(e) => setSheet({ ...sheet, totalCards: +e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>Sell</td>
                    <td>
                      <input type="number" value={sheet?.sellCards || ""}
                        onChange={(e) => setSheet({ ...sheet, sellCards: +e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>Remaining</td>
                    <td>
                      <input type="number" disabled value={getTotalCards()} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="borrow-recovery-container">
          <div className="borrow-container">
            <table>
              <tbody>
                <tr>
                  <th colSpan={2}>Borrow</th>
                </tr>
                {Array.from({ length: 12 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={sheet?.borrow?.[index]?.name || ""}
                        onChange={(e) => updateBorrowEntry(index, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.borrow?.[index]?.amount || ""}
                        onChange={(e) => updateBorrowEntry(index, "amount", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Total</td>
                  <td>
                    <input type="number" disabled value={getTotalBorrowed()} />
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
                {Array.from({ length: 12 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={sheet?.recovery?.[index]?.name || ""}
                        onChange={(e) => updateRecoveryEntry(index, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sheet?.recovery?.[index]?.amount || ""}
                        onChange={(e) => updateRecoveryEntry(index, "amount", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Total</td>
                  <td>
                    <input type="number" disabled value={getTotalRecovery()} />
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
                  <input type="number" disabled />
                </td>
              </tr>
              <tr>
                <td>EasyPaisa</td>
                <td>
                  <input type="number" disabled />
                </td>
              </tr>
              <tr>
                <td>JazzCash</td>
                <td>
                  <input type="number" disabled />
                </td>
              </tr>
              <tr>
                <td>EasyPaisa &amp; JazzCash Accounts</td>
                <td>
                  <input type="number" disabled />
                </td>
              </tr>
              <tr>
                <td>Recovery</td>
                <td>
                  <input type="number" disabled value={getTotalRecovery()} />
                </td>
              </tr>
              <tr>
                <td>Card</td>
                <td>
                  <input type="number" disabled value={getTotalCards()} />
                </td>
              </tr>
              <tr>
                <td>EasyLoad</td>
                <td>
                  <input type="number" disabled />
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
                  <input type="number" disabled />
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
