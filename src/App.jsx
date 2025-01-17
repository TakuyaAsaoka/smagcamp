import './App.css';
import { ItemList } from './components/ItemList';
import { useEffect, useState } from 'react';
import { ItemRegistration } from './components/ItemRegistration';
import { BringList } from './components/BringList';
import { CompleteList } from './components/CompleteList';
// import { Login } from './components/Login';
import { UserRegistration } from './components/UserRegistration';

function App() {
  const fetchServer = 'https://sumgcampserver.onrender.com';
  // process.envはサーバー側でしか使えないからクライアント側ではどうしたらいいのか？
  // const fetchServer = process.env.SERVER_URL ?? 'http://localhost:8080';
  // const fetchServer =
  //   process.env.NODE_ENV === 'production'
  //     ? 'https://sumgcampserver.onrender.com'
  //     : 'http://localhost:8080';

  const [view, setView] = useState('ItemList');
  const pageChange = (name) => setView(name);
  const [allItems, setAllItem] = useState([]);
  const [putBringItem, setPutBringItem] = useState([]);
  const [bringItem, setBringItem] = useState([
    { name: 'テント', isComp: false },
    { name: 'いす', isComp: false },
    { name: '焚き火台', isComp: false },
  ]);

  // ユーザーがログイン済みか判定
  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   user ? setView('ItemList') : setView('Login');
  // }, []);

  // 全アイテム取得
  const fetchItem = async () => {
    try {
      const res = await fetch(`${fetchServer}/allItems`);
      const data = await res.json();
      const gearItem = data.filter((el) => el.categoryName_id === '1');
      const ingredientsItem = data.filter((el) => el.categoryName_id === '2');
      const kitchenwareItem = data.filter((el) => el.categoryName_id === '3');
      const dailyNecessitiesItem = data.filter((el) => el.categoryName_id === '4');
      setAllItem([gearItem, ingredientsItem, kitchenwareItem, dailyNecessitiesItem]);
      setPutBringItem(
        data.map((el) => {
          return { id: el.id, isBring: el.isBring, isComp: el.isComp };
        })
      );
    } catch (error) {
      console.error('error');
    }
  };

  useEffect(() => {
    fetchItem();
    fetchBringItem(); // ページ遷移後のfetchなので意味ないかも？
  }, [view]); //ここに、allItemsが設定されていたことが問題だった！

  // Bringアイテム取得
  const fetchBringItem = async () => {
    try {
      const res = await fetch(`${fetchServer}/bringItems`);
      const data = await res.json();
      const gearItem = data.filter((el) => el.categoryName_id === '1');
      const ingredientsItem = data.filter((el) => el.categoryName_id === '2');
      const kitchenwareItem = data.filter((el) => el.categoryName_id === '3');
      const dailyNecessitiesItem = data.filter((el) => el.categoryName_id === '4');
      setBringItem([gearItem, ingredientsItem, kitchenwareItem, dailyNecessitiesItem]);
    } catch (error) {
      console.log(error);
    }
  };

  // 確認用ログ出力
  // useEffect(() => {
  //   console.log('view :', view);
  //   console.log('bringItem :', bringItem);
  // }, [view, bringItem]);

  const displayView = () => {
    switch (view) {
      // case 'Login':
      //   return <div>{/* <Login view={view} pageChange={pageChange} /> */}</div>;
      case 'UserRegistration':
        return (
          <div>
            <UserRegistration view={view} pageChange={pageChange} />
          </div>
        );
      case 'ItemList':
        return (
          <div>
            <ItemList
              fetchServer={fetchServer}
              fetchBringItem={fetchBringItem}
              pageChange={pageChange}
              allItems={allItems}
              putBringItem={putBringItem}
              setPutBringItem={setPutBringItem}
            />
          </div>
        );
      case 'ItemRegistration':
        return (
          <div>
            <ItemRegistration
              fetchServer={fetchServer}
              pageChange={pageChange}
              fetchItem={fetchItem}
            />
          </div>
        );
      case 'BringList':
        return (
          <div>
            <BringList
              fetchServer={fetchServer}
              pageChange={pageChange}
              bringItem={bringItem}
              setBringItem={setBringItem}
              putBringItem={putBringItem}
              setPutBringItem={setPutBringItem}
            />
          </div>
        );
      case 'CompleteList':
        return (
          <div>
            <CompleteList
              fetchServer={fetchServer}
              pageChange={pageChange}
              bringItem={bringItem}
              setBringItem={setBringItem}
              putBringItem={putBringItem}
              setPutBringItem={setPutBringItem}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="App">{displayView()}</div>;
}

export default App;
