<View
              style={{
                flex: 1,
                backgroundColor: "#cccccc",
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 12,
              }}
            >
              <Text>{item.desc}</Text>
            </View>


            <Text>
              <MaterialCommunityIcons name="currency-ngn" size={15} color="black" />
              <Text style={{ fontWeight: "bold" }}>{item.amount}</Text>
            </Text>

             <View style={{ flexDirection: "row", marginVertical: 3 }}>
                  <MaterialIcons name="star-rate" size={16} color="black" />
                  <Text>
                    {item.rating} ( {item.reviews} )
                  </Text>
                </View>


                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons name="event-available" size={16} color="black" />
                  <Text>{item.availability}</Text>
                </View>

                <Text style={{ marginVertical: 3 }}>
                  {item.totaltasks} Completed tasks{" "}
                </Text>