import { useEffect, useState } from "react";
import { useSheetStore, useThemeStore } from "./store";

function App() {
  const { theme, setTheme } = useThemeStore();
  const { sheet, setSheet } = useSheetStore();

  const [dateTime, setDateTime] = useState({ date: '', time: '' });

  const isPureNumber = (val) => typeof val === 'number' || (/^\d+(\.\d+)?$/.test(val));

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

  const eLoadSell = (network) => {
    return (
      ((sheet?.[`${network}OpeningBalance`] || 0) +
        (sheet?.[`${network}NewBalance`] || 0) +
        (sheet?.[`${network}ReversalBalance`] || 0)) - (sheet?.[`${network}ClosingBalance`] || 0)
    );
  };

  const getTotalCards = () => {
    return (
      (sheet?.totalCards || 0) - (sheet?.sellCards || 0)
    )
  }

  const getTotalELoad = () => {
    return (
      eLoadSell("telenor") + eLoadSell("jazz") + eLoadSell("ufone") + eLoadSell("zong")
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

  const updateOmniEntry = (index, field, value) => {
    const updatedOmni = [...(sheet?.omni || [])];
    updatedOmni[index] = { ...updatedOmni[index], [field]: value };
    setSheet({ ...sheet, omni: updatedOmni });
  };

  const getTotalOmniSending = () => {
    return (sheet?.omni || []).reduce((sum, entry) => {
      const val = entry?.sending;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const getTotalOmniReceiving = () => {
    return (sheet?.omni || []).reduce((sum, entry) => {
      const val = entry?.receiving;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const extractLastOmniBalance = () => {
    const entries = [...(sheet?.omni || [])];
    const regex = /b\s+(\d+)/i; // Matches 'b' followed by space(s) and digits

    // Reverse iterate to get the last entered match
    for (let i = entries.length - 1; i >= 0; i--) {
      const sendMatch = regex.exec(entries[i]?.sending || "");
      if (sendMatch) return Number(sendMatch[1]);

      const receiveMatch = regex.exec(entries[i]?.receiving || "");
      if (receiveMatch) return Number(receiveMatch[1]);
    }

    return null; // If no match found
  };

  const updateEasyPaisaEntry = (index, field, value) => {
    const updatedEasyPaisa = [...(sheet?.easypaisa || [])];
    updatedEasyPaisa[index] = { ...updatedEasyPaisa[index], [field]: value };
    setSheet({ ...sheet, easypaisa: updatedEasyPaisa });
  };

  const getTotalEasyPaisaSending = () => {
    return (sheet?.easypaisa || []).reduce((sum, entry) => {
      const val = entry?.sending;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const getTotalEasyPaisaReceiving = () => {
    return (sheet?.easypaisa || []).reduce((sum, entry) => {
      const val = entry?.receiving;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const extractLastEasyPaisaBalance = () => {
    const entries = [...(sheet?.easypaisa || [])];
    const regex = /b\s+(\d+)/i; // Matches 'b' followed by space(s) and digits

    // Reverse iterate to get the last entered match
    for (let i = entries.length - 1; i >= 0; i--) {
      const sendMatch = regex.exec(entries[i]?.sending || "");
      if (sendMatch) return Number(sendMatch[1]);

      const receiveMatch = regex.exec(entries[i]?.receiving || "");
      if (receiveMatch) return Number(receiveMatch[1]);
    }

    return null; // If no match found
  };

  const updateJazzCashEntry = (index, field, value) => {
    const updatedJazzCash = [...(sheet?.jazzcash || [])];
    updatedJazzCash[index] = { ...updatedJazzCash[index], [field]: value };
    setSheet({ ...sheet, jazzcash: updatedJazzCash });
  };

  const getTotalJazzCashSending = () => {
    return (sheet?.jazzcash || []).reduce((sum, entry) => {
      const val = entry?.sending;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const getTotalJazzCashReceiving = () => {
    return (sheet?.jazzcash || []).reduce((sum, entry) => {
      const val = entry?.receiving;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const extractLastJazzCashBalance = () => {
    const entries = [...(sheet?.jazzcash || [])];
    const regex = /b\s+(\d+)/i; // Matches 'b' followed by space(s) and digits

    // Reverse iterate to get the last entered match
    for (let i = entries.length - 1; i >= 0; i--) {
      const sendMatch = regex.exec(entries[i]?.sending || "");
      if (sendMatch) return Number(sendMatch[1]);

      const receiveMatch = regex.exec(entries[i]?.receiving || "");
      if (receiveMatch) return Number(receiveMatch[1]);
    }

    return null; // If no match found
  };

  const updateEPAccountEntry = (index, field, value) => {
    const updatedEPAccount = [...(sheet?.epaccount || [])];
    updatedEPAccount[index] = { ...updatedEPAccount[index], [field]: value };
    setSheet({ ...sheet, epaccount: updatedEPAccount });
  };

  const getTotalEPAccountSending = () => {
    return (sheet?.epaccount || []).reduce((sum, entry) => {
      const val = entry?.sending;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const getTotalEPAccountReceiving = () => {
    return (sheet?.epaccount || []).reduce((sum, entry) => {
      const val = entry?.receiving;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const extractLastEPAccountBalance = () => {
    const entries = [...(sheet?.epaccount || [])];
    const regex = /b\s+(\d+)/i; // Matches 'b' followed by space(s) and digits

    // Reverse iterate to get the last entered match
    for (let i = entries.length - 1; i >= 0; i--) {
      const sendMatch = regex.exec(entries[i]?.sending || "");
      if (sendMatch) return Number(sendMatch[1]);

      const receiveMatch = regex.exec(entries[i]?.receiving || "");
      if (receiveMatch) return Number(receiveMatch[1]);
    }

    return null; // If no match found
  };


  const updateJCAccountEntry = (index, field, value) => {
    const updatedJCAccount = [...(sheet?.jcaccount || [])];
    updatedJCAccount[index] = { ...updatedJCAccount[index], [field]: value };
    setSheet({ ...sheet, jcaccount: updatedJCAccount });
  };

  const getTotalJCAccountSending = () => {
    return (sheet?.jcaccount || []).reduce((sum, entry) => {
      const val = entry?.sending;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const getTotalJCAccountReceiving = () => {
    return (sheet?.jcaccount || []).reduce((sum, entry) => {
      const val = entry?.receiving;
      return sum + (isPureNumber(val) ? Number(val) : 0);
    }, 0);
  };

  const extractLastJCAccountBalance = () => {
    const entries = [...(sheet?.jcaccount || [])];
    const regex = /b\s+(\d+)/i; // Matches 'b' followed by space(s) and digits

    // Reverse iterate to get the last entered match
    for (let i = entries.length - 1; i >= 0; i--) {
      const sendMatch = regex.exec(entries[i]?.sending || "");
      if (sendMatch) return Number(sendMatch[1]);

      const receiveMatch = regex.exec(entries[i]?.receiving || "");
      if (receiveMatch) return Number(receiveMatch[1]);
    }

    return null; // If no match found
  };

  const updateManualPurchasingEntry = (index, field, value) => {
    const updatedManualPurchasing = [...(sheet?.manualpurchsing || [])];
    updatedManualPurchasing[index] = { ...updatedManualPurchasing[index], [field]: value };
    setSheet({ ...sheet, manualpurchsing: updatedManualPurchasing });
  };

  const getTotalManualPurchasing = () => {
    return (sheet?.manualpurchsing || []).reduce((sum, entry) => {
      return sum + (Number(entry?.amount) || 0);
    }, 0);
  };

  const getTotalPurchasing = () => {
    return (
      getTotalOmniReceiving() +
      getTotalEasyPaisaReceiving() +
      getTotalJazzCashReceiving() +
      getTotalEPAccountReceiving() +
      getTotalJCAccountReceiving() +
      getTotalManualPurchasing()
    )
  };

  const updateRedbookEntry = (index, field, value) => {
    const updatedRedbook = [...(sheet?.redbook || [])];
    updatedRedbook[index] = { ...updatedRedbook[index], [field]: value };
    setSheet({ ...sheet, redbook: updatedRedbook });
  };

  const getTotalRedbook = () => {
    return (sheet?.redbook || []).reduce((sum, entry) => {
      return sum + (Number(entry?.amount) || 0);
    }, 0);
  };

  const getTotalCashInfo = () => {
    const totalCashFromDenominations = getTotalCashToday();
    const totalEasyPaisaSending = getTotalEasyPaisaSending();
    const totalJazzCashSending = getTotalJazzCashSending();
    const totalEPAccountSending = getTotalEPAccountSending();
    const totalJCAccountSending = getTotalJCAccountSending();
    const totalRecovery = getTotalRecovery();
    const totalCards = getTotalCards() * 100;
    const totalELoad = getTotalELoad() - getTotalBorrowed();
    return (
      totalCashFromDenominations +
      totalEasyPaisaSending +
      totalJazzCashSending +
      totalEPAccountSending +
      totalJCAccountSending +
      totalRecovery +
      totalCards +
      totalELoad +
      (sheet?.extra || 0)
    );
  };

  const getTotalCashToday = () => {
    return (
      ((sheet?.cash5000 || 0) * 5000) +
      ((sheet?.cash1000 || 0) * 1000) +
      ((sheet?.cash500 || 0) * 500) +
      ((sheet?.cash100 || 0) * 100) +
      ((sheet?.cash50 || 0) * 50) +
      ((sheet?.cash20 || 0) * 20) +
      ((sheet?.cash10 || 0) * 10) +
      ((sheet?.cash5 || 0) * 5)
    )
  }
  return (
    <div className={`container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <div className="header">
        <div className="title-container">
          <h1>KMK Communication</h1>
        </div>
        <div className="time-actions-container">
          <p id="current-date">{dateTime.date}</p>
          <p id="current-time">{dateTime.time}</p>
          <div className="actions">
            <button id="theme-toggle" className="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              Change Theme to {theme === "dark" ? "Light" : "Dark"}
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
                      <input type="number" disabled value={eLoadSell("telenor")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Jazz</td>
                    <td>
                      <input type="number" disabled value={eLoadSell("jazz")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Ufone</td>
                    <td>
                      <input type="number" disabled value={eLoadSell("ufone")} />
                    </td>
                  </tr>
                  <tr>
                    <td>Zong</td>
                    <td>
                      <input type="number" disabled value={eLoadSell("zong")} />
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
              {Array.from({ length: 11 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={sheet?.omni?.[index]?.sending || ""}
                      onChange={(e) => updateOmniEntry(index, "sending", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={sheet?.omni?.[index]?.receiving || ""}
                      onChange={(e) => updateOmniEntry(index, "receiving", e.target.value)}
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td>Total Sending</td>
                <td>
                  <input type="number" disabled value={getTotalOmniSending()} />
                </td>
              </tr>
              <tr>
                <td>Total Receiving</td>
                <td>
                  <input type="number" disabled value={getTotalOmniReceiving()} />
                </td>
              </tr>
              <tr>
                <td>Last Balance</td>
                <td>
                  <input type="number" disabled value={extractLastOmniBalance() || ""} />
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
                <th colSpan={2}>Easy Paisa</th>
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
              {Array.from({ length: 11 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={sheet?.easypaisa?.[index]?.sending || ""}
                      onChange={(e) => updateEasyPaisaEntry(index, "sending", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={sheet?.easypaisa?.[index]?.receiving || ""}
                      onChange={(e) => updateEasyPaisaEntry(index, "receiving", e.target.value)}
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td>Total Sending</td>
                <td>
                  <input type="number" disabled value={getTotalEasyPaisaSending()} />
                </td>
              </tr>
              <tr>
                <td>Total Receiving</td>
                <td>
                  <input type="number" disabled value={getTotalEasyPaisaReceiving()} />
                </td>
              </tr>
              <tr>
                <td>Last Balance</td>
                <td>
                  <input type="number" disabled value={extractLastEasyPaisaBalance() || ""} />
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
              {Array.from({ length: 11 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={sheet?.jazzcash?.[index]?.sending || ""}
                      onChange={(e) => updateJazzCashEntry(index, "sending", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={sheet?.jazzcash?.[index]?.receiving || ""}
                      onChange={(e) => updateJazzCashEntry(index, "receiving", e.target.value)}
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td>Total Sending</td>
                <td>
                  <input type="number" disabled value={getTotalJazzCashSending()} />
                </td>
              </tr>
              <tr>
                <td>Total Receiving</td>
                <td>
                  <input type="number" disabled value={getTotalJazzCashReceiving()} />
                </td>
              </tr>
              <tr>
                <td>Last Balance</td>
                <td>
                  <input type="number" disabled value={extractLastJazzCashBalance() || ""} />
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
              {Array.from({ length: 11 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={sheet?.epaccount?.[index]?.sending || ""}
                      onChange={(e) => updateEPAccountEntry(index, "sending", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={sheet?.epaccount?.[index]?.receiving || ""}
                      onChange={(e) => updateEPAccountEntry(index, "receiving", e.target.value)}
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td>Total Sending</td>
                <td>
                  <input type="number" disabled value={getTotalEPAccountSending()} />
                </td>
              </tr>
              <tr>
                <td>Total Receiving</td>
                <td>
                  <input type="number" disabled value={getTotalEPAccountReceiving()} />
                </td>
              </tr>
              <tr>
                <td>Last Balance</td>
                <td>
                  <input type="number" disabled value={extractLastEPAccountBalance() || ""} />
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
              {Array.from({ length: 11 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={sheet?.jcaccount?.[index]?.sending || ""}
                      onChange={(e) => updateJCAccountEntry(index, "sending", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={sheet?.jcaccount?.[index]?.receiving || ""}
                      onChange={(e) => updateJCAccountEntry(index, "receiving", e.target.value)}
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td>Total Sending</td>
                <td>
                  <input type="number" disabled value={getTotalJCAccountSending()} />
                </td>
              </tr>
              <tr>
                <td>Total Receiving</td>
                <td>
                  <input type="number" disabled value={getTotalJCAccountReceiving()} />
                </td>
              </tr>
              <tr>
                <td>Last Balance</td>
                <td>
                  <input type="number" disabled value={extractLastJCAccountBalance() || ""} />
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
                  <input type="number" disabled value={getTotalOmniReceiving()} />
                </td>
              </tr>
              <tr>
                <td className="text-sm">EasyPaisa Rec</td>
                <td>
                  <input type="number" disabled value={getTotalEasyPaisaReceiving()} />
                </td>
              </tr>
              <tr>
                <td className="text-sm">JazzCash Rec</td>
                <td>
                  <input type="number" disabled value={getTotalJazzCashReceiving()} />
                </td>
              </tr>
              <tr>
                <td className="text-sm">EP AC 0333 Rec</td>
                <td>
                  <input type="number" disabled value={getTotalEPAccountReceiving()} />
                </td>
              </tr>
              <tr>
                <td className="text-sm">JC AC 0307 Rec</td>
                <td>
                  <input type="number" disabled value={getTotalJCAccountReceiving()} />
                </td>
              </tr>
              {Array.from({ length: 10  }).map((_, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={sheet?.manualpurchsing?.[index]?.name || ""}
                  onChange={(e) => updateManualPurchasingEntry(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={sheet?.manualpurchsing?.[index]?.amount || ""}
                  onChange={(e) => updateManualPurchasingEntry(index, "amount", e.target.value)}
                />
              </td>
            </tr>
          ))}
              <tr>
                <td>Total</td>
                <td>
                  <input type="number" disabled value={getTotalPurchasing()} />
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
                  <input type="number" value={sheet?.cash5000 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash5000: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={5000 * (sheet?.cash5000 || "")} />
                </td>
              </tr>
              <tr>
                <td>1000</td>
                <td>x</td>
                <td>
                  <input type="number" value={sheet?.cash1000 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash1000: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={1000 * (sheet?.cash1000 || "")} />
                </td>
              </tr>
              <tr>
                <td>500</td>
                <td>x</td>
                <td>
                  <input type="number" value={sheet?.cash500 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash500: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={500 * (sheet?.cash500 || "")} />
                </td>
              </tr>
              <tr>
                <td>100</td>
                <td>x</td>
                <td>
                  <input type="number" value={sheet?.cash100 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash100: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={100 * (sheet?.cash100 || "")} />
                </td>
              </tr>
              <tr>
                <td>50</td>
                <td>x</td>
                <td>
                  <input type="number" value={sheet?.cash50 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash50: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={50 * (sheet?.cash50 || "")} />
                </td>
              </tr>
              <tr>
                <td>20</td>
                <td>x</td>
                <td>
                  <input type="number" value={sheet?.cash20 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash20: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={20 * (sheet?.cash20 || "")} />
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>x</td>
                <td>
                  <input type="number" value={sheet?.cash10 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash10: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={10 * (sheet?.cash10 || "")} />
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>x</td>
                <td>
                  <input type="number" value={sheet?.cash5 || ""}
                    onChange={(e) => setSheet({ ...sheet, cash5: +e.target.value })} />
                </td>
                <td>
                  <input type="number" disabled value={5 * (sheet?.cash5 || "")} />
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Total</td>
                <td>
                  <input type="number" disabled value={getTotalCashToday()} />
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
                  <input type="number" value={sheet?.previousCash || ""}
                    onChange={(e) => setSheet({ ...sheet, previousCash: +e.target.value })} />
                </td>
              </tr>
              <tr>
                <td>Today Cash</td>
                <td>
                  <input type="number" value={getTotalCashToday()} disabled />
                </td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>
                  <input type="number" value={getTotalCashInfo()} disabled  />
                </td>
              </tr>
              <tr>
                <td>Recovery &amp; Purchasing</td>
                <td>
                  <input type="number" value={getTotalRecovery() + getTotalPurchasing()} disabled  />
                </td>
              </tr>
              <tr>
                <td>Remaining Cash</td>
                <td>
                  <input type="number" value={(sheet?.previousCash + getTotalCashToday() + getTotalCashInfo()) - (getTotalRecovery() + getTotalPurchasing())} disabled  />
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
                    readOnly
                    value={getTotalCashToday()} 
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
              {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={sheet?.redbook?.[index]?.name || ""}
                      onChange={(e) => updateRedbookEntry(index, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={sheet?.redbook?.[index]?.amount || ""}
                      onChange={(e) => updateRedbookEntry(index, "amount", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>
                  <input type="number" disabled value={getTotalRedbook()} />
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
                  <input type="number" disabled value={getTotalOmniSending()} />
                </td>
              </tr>
              <tr>
                <td>EasyPaisa</td>
                <td>
                  <input type="number" disabled value={getTotalEasyPaisaSending()}  />
                </td>
              </tr>
              <tr>
                <td>JazzCash</td>
                <td>
                  <input type="number" disabled value={getTotalJazzCashSending()}  />
                </td>
              </tr>
              <tr>
                <td>EasyPaisa &amp; JazzCash Accounts</td>
                <td>
                  <input type="number" disabled value={getTotalEPAccountSending() + getTotalJCAccountSending()} />
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
                  <input type="number" disabled value={getTotalCards() * 100} />
                </td>
              </tr>
              <tr>
                <td>EasyLoad</td>
                <td>
                  <input type="number" disabled value={getTotalELoad() - getTotalBorrowed()} />
                </td>
              </tr>
              <tr>
                <td>Extra</td>
                <td>
                  <input type="number" value={sheet?.extra || ""}
                    onChange={(e) => setSheet({ ...sheet, extra: +e.target.value })} />
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <input type="number" disabled value={getTotalCashInfo()} />
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
