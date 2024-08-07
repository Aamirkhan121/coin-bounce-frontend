import React, { useEffect, useState } from 'react';
import styles from "./Crypto.module.css";
import { getCrypto } from '../../api/external';
import Loader from '../../components/Loader/Loader';

function Crypto() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async function cryptoApiCall() {
            const response = await getCrypto();
            setData(response);
        })();
        setData([]);
    }, []);

    if (data.length === 0) {
        return <Loader text={"CryptoCurrencies"} />;
    }

    const negativeStyle = {
        color: "#ea3943"
    };
    const positiveStyle = {
        color: "#16c784"
    };

    return (
        <div>
            <div className="table-responsive">
                <table className='table table-striped'>
                    <thead>
                        <tr className={styles.head}>
                            <th>#</th>
                            <th>Coin</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((coin) => (
                                <tr key={coin.id} className={styles.tableRow}>
                                    <td>{coin.market_cap_rank}</td>
                                    <td>
                                        <div className={styles.logo}>
                                            <img src={coin.image} width={40} height={40} alt='' /> {coin.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.symbol}>{coin.symbol}</div>
                                    </td>
                                    <td>{coin.current_price}</td>
                                    <td style={coin.price_change_percentage_24h < 0 ? negativeStyle : positiveStyle}>{coin.price_change_percentage_24h}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Crypto;
