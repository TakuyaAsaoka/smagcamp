import React, { useEffect } from 'react';
import picture from '../image/picture.svg';

export const BringList = (props) => {
  const removeBringItem = (e) => {
    const targetName = e.target.closest('td').previousElementSibling.firstElementChild;
    const targetIndex = props.BringItem.findIndex((el) =>
      el.some((el2) => el2.itemName === targetName.innerText)
    );
    const updatedBringItem = props.BringItem.map((el, index) =>
      index === targetIndex
        ? el.map((el2) =>
            el2.itemName === targetName.innerText ? { ...el2, isComp: !el2.isComp } : el2
          )
        : el
    );
    props.setBringItem(updatedBringItem);
  };

  const showTable = (e) => {
    const targetTable = e.target.nextElementSibling;
    targetTable.classList.toggle('none');
  };

  const isCompChange = (e) => {
    let putItem = props.putBringItem;
    const targetId = Number(e.target.id);
    let targetCheck = e.target.checked;
    if (e.target.closest('label').className === 'toggle-button-002') {
      targetCheck = targetCheck ? false : true;
    }
    let result = putItem.map((el) => {
      if (el.id === targetId) {
        return { ...el, isComp: targetCheck };
      } else {
        return el;
      }
    });
    props.setPutBringItem(result);
  };

  const putCompleteList = async () => {
    try {
      const res = await fetch('http://localhost:8080/changeCompItems', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props.putBringItem),
      });
      const result = await res.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mainBrock">
        {Array.isArray(props.BringItem) &&
          props.BringItem.map(
            (el, index) =>
              el.length !== 0 && (
                <React.Fragment key={index}>
                  <p className="categoryTitle" onClick={showTable}>
                    {index === 0
                      ? 'ギア'
                      : index === 1
                      ? '食材'
                      : index === 2
                      ? '調理器具'
                      : '日用品'}
                  </p>
                  <table border="1" className="none">
                    <thead>
                      <tr>
                        <th>写真</th>
                        <th>名前</th>
                        <th>準備完了！</th>
                      </tr>
                    </thead>
                    <tbody>
                      {el
                        // .filter((element) => !element.isComp)
                        .map((el2, index2) => (
                          <tr key={el2.id}>
                            <td align="center">
                              <img src={picture} alt="pictureImg" className="btn pictureBtn" />
                            </td>
                            <td align="center">
                              <p className="allItemName">{el2.itemName}</p>
                            </td>
                            <td align="center">
                              <label className={'toggle-button-001'}>
                                <input
                                  id={el2.id}
                                  type="checkbox"
                                  checked={el2.isComp}
                                  className="allItemBringCheck"
                                  onChange={(e) => {
                                    removeBringItem(e);
                                    isCompChange(e);
                                  }}
                                />
                              </label>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </React.Fragment>
              )
          )}
      </div>

      <div className="bottomBrock">
        <button
          onClick={() => {
            props.pageChange('CompleteList');
            putCompleteList();
          }}
        >
          完了済アイテム
        </button>
        <button onClick={() => props.pageChange('ItemList')}>戻る</button>
      </div>
    </>
  );
};
