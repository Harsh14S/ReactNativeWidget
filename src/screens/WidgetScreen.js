import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import axios from 'axios';
import {IconLinks} from '../assets/png/IconLinks';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../assets/Colors';

const appGroupIdentifier = 'group.streak';
const SharedStorage = NativeModules.SharedStorage;
const SharedStorage2 = NativeModules.LargeWidgetSharedStorage;

const WidgetScreen = () => {
  const [apiData, setApiData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const apiCall = async () => {
    await axios
      .get(
        'https://mobilebackend.amanalabs.net/api/symbol_state?type=json&token=XXX-DEV&login=20000143',
      )
      .then(res => {
        // console.log('=====> ', res.data);
        setApiData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    setShowLoader(false);
    setRefreshing(false);
  };

  const setWidgetData = async ind => {
    if (Platform.OS === 'ios') {
      try {
        await SharedGroupPreferences.setItem(
          'widgetKey',
          apiData?.[ind],
          appGroupIdentifier,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      SharedStorage.set(JSON.stringify(apiData?.[ind]));
      SharedStorage2.set(JSON.stringify(apiData.slice(ind, ind + 4)));
      // console.log(
      //   'Datat 0=------> ',
      //   JSON.stringify(apiData.slice(ind, ind + 4)),
      // );
      ToastAndroid.show('widget updated successfully!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    setShowLoader(true);
    apiCall();
  }, []);

  const scrollRefresh = () => {
    setRefreshing(true);
    apiCall();
  };

  return (
    <View style={styles.safeAreaContainer}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>Change Widget Value</Text>
          {showLoader ? (
            <ActivityIndicator
              size={'large'}
              style={{flex: 1}}
              color={COLORS.tx_green}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.flatListContent}
              data={apiData}
              extraData={apiData}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={scrollRefresh}
                  tintColor={COLORS.tx_green}
                  colors={[COLORS.tx_green]}
                />
              }
              ItemSeparatorComponent={<View style={styles.itemSeparator} />}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => {
                      setWidgetData(index);
                    }}
                    activeOpacity={0.8}>
                    <Image
                      source={IconLinks.ProviderLogo}
                      style={styles.listItemLogo}
                    />
                    <View style={styles.listItemDetails}>
                      <Text style={styles.listItemSymbol} numberOfLines={1}>
                        {item?.Symbol}
                      </Text>
                      <View style={styles.listItemPrice}>
                        <Text style={styles.listItemPriceText}>
                          {item?.Bid}
                        </Text>
                      </View>
                      <Image
                        source={
                          item?.lev
                            ? IconLinks.GraphPositive
                            : IconLinks.GraphNegative
                        }
                        style={[
                          styles.listItemGraph,
                          {
                            tintColor: item?.lev
                              ? COLORS.tx_green
                              : COLORS.tx_red,
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.listItemBackground,
                          {
                            backgroundColor: item?.lev
                              ? COLORS.bg_greenD
                              : COLORS.bg_redD,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.listItemPercentage,
                            {
                              color: item?.lev
                                ? COLORS.tx_green
                                : COLORS.tx_red,
                            },
                          ]}>
                          {item?.lev ? '+' : '-'} {item?.Perc + '%'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: COLORS.bg_black,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  flatListContent: {
    padding: RFValue(10),
  },
  itemSeparator: {
    margin: RFValue(2),
  },
  listItem: {
    paddingVertical: RFValue(15),
    paddingHorizontal: RFValue(10),
    width: '100%',
    flexDirection: 'row',
    borderRadius: RFValue(10),
    backgroundColor: COLORS.bg_black,
  },
  listItemLogo: {
    height: RFValue(35),
    width: RFValue(35),
    resizeMode: 'contain',
  },
  listItemDetails: {
    flex: 1,
    marginLeft: RFValue(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  listItemSymbol: {
    flex: 1,
    color: COLORS.grey,
    fontSize: RFValue(12),
    fontWeight: '500',
    marginRight: RFValue(5),
  },
  listItemPrice: {
    flex: 1,
    marginRight: RFValue(10),
  },
  listItemPriceText: {
    color: COLORS.tx_white,
    fontSize: RFValue(14),
    fontWeight: '700',
    textAlign: 'center',
  },
  listItemGraph: {
    width: RFValue(35),
    height: RFValue(15),
    resizeMode: 'contain',
    marginRight: RFValue(10),
  },
  listItemBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(2),
    borderRadius: RFValue(4),
  },
  listItemPercentage: {
    color: COLORS.tx_red,
    fontSize: RFValue(12),
    fontWeight: '500',
  },
});

export default WidgetScreen;
