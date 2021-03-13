import React, { useState, useEffect } from "react";
import UserProfilePicture from "../UserProfilePicture.jsx";

const Notifications = ({ user, onClick }) => {
  return (
    <>
      <div
        className="absolute bg-white rounded py-6 border z-10 right-0 shadow-lg"
        id="notifications"
      >
        <h1 className="text-black pl-6">Meldingen</h1>
        {user.receivedNotifications &&
          user.receivedNotifications.map((notification) => {
            return (
              <Notification
                onClick={onClick}
                key={notification.id}
                notification={notification}
              />
            );
          })}
      </div>
    </>
  );
};

export default Notifications;

const Notification = ({ notification, onClick }) => {
  const { giver, photo } = notification;

  console.log(notification);

  const generateText = () => {
    if (notification.action === "like") {
      return `${
        !giver.firstame ? giver.username : giver.firstname
      } vind je foto ${photo.title} leuk`;
    }
    if (notification.action === "comment") {
      return `${
        !giver.firstame ? giver.username : giver.firstname
      } heeft gereageerd op je foto ${photo.title}`;
    }
    if (notification.action === "follow") {
      return `${
        !giver.firstame ? giver.username : giver.firstname
      } volgt je nu!`;
    }
  };

  const goToPage = () => {
    if (notification.action === "like" || notification.action === "comment") {
      onClick(`/foto/${photo.slug}`);
    }
    if (notification.action === "follow") {
      onClick(`/fotograaf/${giver.slug}`);
    }
  };

  return (
    <>
      <div
        onClick={goToPage}
        className="flex items-center relative my-2 px-6 py-4 hover:bg-gray-100"
      >
        <div className="mr-4">
          <UserProfilePicture profile={notification.giver} size={8} />
        </div>
        <div>{generateText()}</div>
      </div>
    </>
  );
};
