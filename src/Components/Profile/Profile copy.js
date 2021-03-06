import React, { useState } from "react";
import Address from "../Address/Address";
import Card from "../Card/Card";
import CustomerCard from "../CustomerCard/CustomerCard";
import style from "./Profile.module.css";
import CustomerAddress from "../CustomerAddress/CustomerAddress";

export default function Profile({
  currentUser,
  deleteAddress,
  addAddress,
  editAddressMain,
  setFavAddress,
  deleteCard,
  addCard,
  editCardMain,
  setFavCard,
}) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [edtAddress, setedtAddress] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [edtCard, setedtCard] = useState(null);
  const sendAddress = (address) => {
    addAddress(
      (address = { ...address, fav: "false", usps: null }),
      currentUser._id
    );
    setShowAddressForm(false);
    console.log(currentUser);
  };
  const cancelAddressChange = () => {
    setShowAddressForm(false);
  };
  const editAddressinDB = (address) => {
    setShowAddressForm(false);
    editAddressMain(currentUser._id, (address = { ...address }));
    setedtAddress(null);
  };
  const delAddress = (addId) => {
    deleteAddress(currentUser._id, addId);
  };

  const editAddress = (address) => {
    setedtAddress(address);
    setShowAddressForm(true);
  };

  const setFavAdd = (id) => {
    setFavAddress(currentUser._id, id);
  };

  const uspsUpdate = (address) => {
    editAddressMain(currentUser._id, address);
  };

  const sendCard = (card) => {
    addCard((card = { ...card, fav: "false" }), currentUser._id);
    setShowCardForm(false);
  };
  const cancelCardChange = () => {
    setShowCardForm(false);
  };
  const editCardinDB = (card) => {
    // console.log(address);
    setShowCardForm(false);
    editCardMain(currentUser._id, (card = { ...card }));
    setedtCard(null);
  };
  const delCard = (addId) => {
    deleteCard(currentUser._id, addId);
  };

  const editCard = (card) => {
    setedtCard(card);

    setShowCardForm(true);
  };

  const setFavCrd = (id) => {
    setFavCard(currentUser._id, id);
  };

  const savedAddresses = currentUser.address ? (
    currentUser.address.map((address) => {
      return (
        <Address
          address={address}
          key={address._id}
          delAddress={delAddress}
          editAddress={editAddress}
          setFavAddress={setFavAdd}
          uspsCheck={uspsUpdate}
        />
      );
    })
  ) : (
    <div>
      <button className='iconButton' onClick={(e) => setShowAddressForm(true)}>
        <i className='fas fa-plus-circle fa-2x'></i>
      </button>
      <p>Click to add new address</p>
    </div>
  );

  const savedCards = currentUser.card ? (
    currentUser.card.map((card) => {
      return (
        <Card
          card={card}
          key={card._id}
          delCard={delCard}
          editCard={editCard}
          setFavCard={setFavCrd}
        />
      );
    })
  ) : (
    <div>
      <button className='iconButton' onClick={(e) => setShowCardForm(true)}>
        <i className='fas fa-plus-circle fa-2x'></i>
      </button>
      <p>Click to add new Card</p>
    </div>
  );
  return (
    <div className={style.profile}>
      <header>
        <h5>John Doe </h5>
        <h5>John@Doe.com </h5>
      </header>
      <h4>
        Account Profile Setup: <span>Edit your account profile here.</span>{" "}
      </h4>
      <main className={style.profileMain}>
        <div>
          <h4>
            Address : <span>You can save up to 6 addresses.</span>
          </h4>
          <div className={style.addressSection}>
            {savedAddresses}
            {currentUser &&
            currentUser.address &&
            currentUser.address.length < 6 &&
            currentUser.address.length >= 0 ? (
              <div className={style.addAddress}>
                <button
                  className='iconButton'
                  onClick={(e) => setShowAddressForm(true)}>
                  <i className='fas fa-plus-circle fa-2x'></i>
                </button>
                <p>Click to add new address</p>
              </div>
            ) : null}
          </div>
          {showAddressForm ? (
            <CustomerAddress
              addAddress={sendAddress}
              address={edtAddress}
              editAddress={editAddressinDB}
              cancelAddressChange={cancelAddressChange}
            />
          ) : null}
        </div>
        <div>
          <h4>
            Card : <span>You can save up to 6 cards.</span>
          </h4>
          <div className={style.addressSection}>
            {savedCards}
            {currentUser &&
            currentUser.card &&
            currentUser.card.length < 6 &&
            currentUser.card.length >= 0 ? (
              <div className={style.addAddress}>
                <button
                  className='iconButton'
                  onClick={(e) => setShowCardForm(true)}>
                  <i className='fas fa-plus-circle fa-2x'></i>
                </button>
                <p>Click to add new card</p>
              </div>
            ) : null}
          </div>
          {showCardForm ? (
            <CustomerCard
              addCard={sendCard}
              card={edtCard}
              editCard={editCardinDB}
              cancelCardChange={cancelCardChange}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
