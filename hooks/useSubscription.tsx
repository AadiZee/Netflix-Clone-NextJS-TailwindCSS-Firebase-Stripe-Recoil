import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import payments from "../lib/stripe";

const useSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === "active" ||
            subscription.status === "trialing"
        )[0]
      );
    });
  }, [user]);
  return subscription;
};

export default useSubscription;
