interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: blockchain;
  }
  
  class Datasource {
    constructor(private url: string) {}
  
    async getPrices(): Promise<Record<string, number>> {
      const response = await fetch(this.url);
      const data = await response.json();
      return data.prices;
    }
  }

  const priorityMap = new Map<string, number>(
    Object.entries({
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    })
  );
  
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(setPrices).catch(console.error);
    }, []);

    const rows = useMemo(() => {
        return balances
          .filter((balance) => priorityMap.has(balance.blockchain) && balance.amount > 0)
          .sort((a, b) => priorityMap.get(b.blockchain) - priorityMap.get(a.blockchain))
          .map((balance) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
              <WalletRow 
                className={classes.row}
                key={balance.currency}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.amount.toFixed()}
              />
            );
          });
      }, [balances, prices]);
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }