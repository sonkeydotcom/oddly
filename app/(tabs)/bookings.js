import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import TaskRow from "../../components/taskRow";
import BookingsCard from "../../components/bookingsCard";
import TaskerBookingCard from "../../components/taskerBookingCard";

const Bookings = () => {
  const auth = getAuth();
  const db = getFirestore();
  userId = auth.currentUser.uid;

  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [accetped, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a data fetch from an API
    fetchBookings().then(() => {
      setRefreshing(false);
    });
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const q1 = query(
        collection(db, "bookings"),
        where("userId", "==", auth.currentUser.uid)
      );
      const q2 = query(
        collection(db, "bookings"),
        where("taskerId", "==", auth.currentUser.uid)
      );

      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);

      const bookingList1 = querySnapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const bookingList2 = querySnapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const mergedBookingList = [...bookingList1, ...bookingList2];

      setBookings(mergedBookingList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchBookings = async () => {
      try {
        const q1 = query(
          collection(db, "bookings"),
          where("userId", "==", auth.currentUser.uid)
        );
        const q2 = query(
          collection(db, "bookings"),
          where("taskerId", "==", auth.currentUser.uid)
        );

        const querySnapshot1 = await getDocs(q1);
        const querySnapshot2 = await getDocs(q2);

        const bookingList1 = querySnapshot1.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const bookingList2 = querySnapshot2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const mergedBookingList = [...bookingList1, ...bookingList2];

        setBookings(mergedBookingList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const getTaskerNameById = async (taskerId) => {
      try {
        const docRef = doc(db, "users", taskerId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          return userData.name; // Return the tasker's name
        } else {
          return "Unknown"; // Tasker not found or name not available
        }
      } catch (error) {
        console.error("Error fetching tasker data:", error);
        return "Unknown";
      }
    };

    const fetchBookingTaskerNames = async () => {
      const bookingsWithTaskerNames = await Promise.all(
        bookings.map(async (booking) => {
          const taskerName = await getTaskerNameById(booking.taskerId);
          return { ...booking, taskerName };
        })
      );
      setBookings(bookingsWithTaskerNames);
    };

    fetchBookings();
    fetchBookingTaskerNames();
  }, []);

  return (
    <>
      <View style={{ paddingHorizontal: 8, flex: 1 }}>
        {isLoading ? (
          <>
            <ActivityIndicator
              title="Loading..."
              size="large"
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
                paddingHorizontal: 10,

                paddingVertical: 10,
              }}
              color="#ccc"
            />
          </>
        ) : (
          <FlatList
            data={bookings}
            renderItem={({ item: booking }) =>
              userId !== booking.userId ? (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: `/bookingDetails`,
                      params: {
                        id: booking.id,
                        taskerName: booking.taskerName,
                        userName: booking.userName,
                        taskerId: booking.taskerId,
                        userPhone: booking.userPhone,
                      },
                    })
                  }
                >
                  <TaskerBookingCard booking={booking} />
                </TouchableOpacity>
              ) : (
                <BookingsCard booking={booking} />
              )
            }
            keyExtractor={(booking) => booking.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </>
  );
};

export default Bookings;
