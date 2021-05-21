/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React, { Component } from 'react'
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import {
  Body,
  Header,
  List,
  ListItem as Item,
  ScrollableTab,
  Tab,
  TabHeading,
  Tabs,
  Title
} from 'native-base'
import { HorizontalCards } from '../Cards/HorizontalCards'
import { DEFAULT_THEME_COLOR } from '../../constants/colors'
import { fontStyles } from '../../constants/fontStyles'
import Button from '../Button'
import { ItemCard } from '../Cards/ItemCard'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { ItemDetail } from '../ItemDetails/ItemDetail'
import axios from 'axios'
import BottomTabs from '../../navigation/bottomNavigation'
import { useSelector } from 'react-redux'
import Cart from '../Cart'
// import { TouchableOpacity } from 'react-native-gesture-handler'
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const IMAGE_HEIGHT = 250
const HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 50
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT
const THEME_COLOR = DEFAULT_THEME_COLOR
const FADED_THEME_COLOR = 'rgba(85,186,255, 0.8)'

export class ParallaxDemo extends Component {
  nScroll = new Animated.Value(0)
  scroll = new Animated.Value(0)
  textColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, 'black'],
    extrapolate: 'clamp'
  })
  tabBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ['white', THEME_COLOR],
    extrapolate: 'clamp'
  })
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  })
  headerBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ['transparent', 'transparent', '#fff'],
    extrapolate: 'clamp'
  })
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: 'clamp'
  })
  imgOpacity = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0]
  })
  headerColor = this.scroll.interpolate({
    inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
  })

  trnaslateX = this.scroll.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 5],
    outputRange: [0, 40],
    extrapolate: 'clamp'
  })
  tabContent = (x, i) => (
    <View style={{ height: this.state.height }}>
      <List
        onLayout={({
          nativeEvent: {
            layout: { height }
          }
        }) => {
          this.heights[i] = height
          if (this.state.activeTab === i) {
            this.setState({ height })
          }
        }}>
        {this.state?.items.map((item, index) => (
          <ItemCard
            item={item}
            onPress={() => {
              this.setState({
                selectedItem: item
              })
              this.itemRef.setModalVisible()
            }}
            containerStyle={{ margin: 10 }}
          />
        ))}
      </List>
      {this.state.ShowCart ? (
        <Cart navigation={this.props.navigation} />
      ) : (
        <></>
      )}
    </View>
  )
  heights = [500, 500]
  state = {
    activeTab: 0,
    height: 1000
  }

  constructor(props) {
    super(props)
    this.nScroll.addListener(
      Animated.event([{ value: this.scroll }], { useNativeDriver: false })
    )
    this.state = {
      items: [],
      selectedItem: {},
      cust_id: this.props.route.params.props.cust_id,
      ShowCart: false
    }
  }

  async getCart() {
    try {
      const response = await axios.get(
        'https://poppins-order-service.herokuapp.com/order_creation/get_cart_frontend/' +
          this.props.route.params.props.cust_id
      )
      const cart_content = await response.data
    console.log('1111111111111111111111111111111111111', cart_content)
      if (cart_content?.payload.id) {
        this.setState({ ShowCart: true })
      } else {
        this.setState({ ShowCart: false })
      }
    } catch (e) {
      console.error('6666666666666', e)
    }
  }

  componentDidMount() {
    console.log('00000000000000000000000000000000000000000', this.state.ShowCart, this.props.route.params)
    try {
      axios
        .get(
          'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/internals/get_menu_by_merchant_id/' +
            this.props.route.params.props.restaurant.id
        )
        .then(response => {
          console.log('@@@@@@@@@@@@@@@@@', response?.data)
          if (response?.data.code === 200) {
            axios
              .get(
                'http://poppins-lb-1538414865.us-east-2.elb.amazonaws.com/internals/get_all_items/' +
                  response?.data?.payload?.menu_id
              )
              .then(res => {
                console.log('###########', res)
                if (res?.data.code === 200) {
                  this.setState({ items: res.data.payload })
                  console.log('@@@@@@@@@@@', this.state.items)
                }
              })
              .catch(e => console.error(e))
          }
        })
      this.getCart()
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    // console.log('this.props', this.props.route.params.restaurant)
    const restaurant = this.props.route.params.props.restaurant
    const AnmatedScrollView = Animated.createAnimatedComponent(ScrollableTab)
    return (
      <View>
        <ItemDetail
          ref={e => (this.itemRef = e)}
          closeModal={() => this.itemRef.setModalVisible(false)}
          goTo={screen => this.props.navigation.navigate(screen)}
          item={this.state.selectedItem}
          merch_id={this.props.route.params.props.restaurant.id}
          getCart={this.getCart}
          parentThis={this}
        />
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: HEADER_HEIGHT,
            backgroundColor: this.headerColor,
            zIndex: 1
          }}>
          <Header
            transparent
            style={{ backgroundColor: 'transparent' }}
            hasTabs>
            {/* <Body> */}
            {/* <Title>
                <Animated.Text style={{ color: this.textColor, fontWeight: "bold" }}>
                  Tab Parallax
              </Animated.Text>
              </Title> */}

            {/* <TouchableOpacity
              onPress={() => {
                console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
                this.props.navigation.navigate('Home')
              }}
              style={{
                backgroundColor: 'rgba(0,0,0,.36)',
                height: 30,
                width: 30,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: 10,
                marginTop: Platform.OS == 'ios' ? 10 : 55
              }}>
              <Text
                onPress={() => {
                  console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
                  this.props.navigation.navigate('Home')
                }}>
                Back
              </Text>
              <Ionicons name="chevron-back" size={25} color={'#fff'} />
            </TouchableOpacity> */}
            {/* </Body> */}
          </Header>
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.nScroll } } }],
            { useNativeDriver: true }
          )}
          style={{ zIndex: 0 }}>
          <Animated.View
            style={{
              transform: [
                { translateY: Animated.multiply(this.nScroll, 0.65) },
                { scale: this.imgScale }
              ],
              backgroundColor: 'transparent'
            }}>
            <Animated.Image
              source={
                restaurant?.profile_image_url &&
                restaurant?.profile_image_url !== 'Not Available'
                  ? restaurant?.profile_image_url
                  : require('../../assets/images/bg.png')
              }
              style={{
                height: IMAGE_HEIGHT,
                width: '100%',
                opacity: this.imgOpacity
              }}
            />
          </Animated.View>

          <Tabs
            prerenderingSiblingsNumber={0}
            tabBarBackgroundColor="transparent"
            onChangeTab={({ i }) => {
              this.setState({ height: this.heights[i], activeTab: i })
            }}
            renderTabBar={props => {
              return (
                <>
                  <Animated.View
                    style={{
                      transform: [{ translateY: this.tabY }],
                      zIndex: 1,
                      width: '100%',
                      backgroundColor: '#F1F2FA'
                    }}>
                    <Animated.View
                      style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 10,
                        top: -10
                      }}>
                      <Animated.Text
                        style={[
                          fontStyles.ProximaBoldH1,
                          { transform: [{ translateX: this.trnaslateX }] }
                        ]}
                        onPress={() => this?.props?.navigation?.goBack()}>
                        <Ionicons
                          name={'arrow-back'}
                          size={25}
                          // color={leftIconColor}
                        />
                        {restaurant?.name}
                      </Animated.Text>
                      <Animated.Text
                        style={[
                          fontStyles.ProximaRegularP2,
                          {
                            fontSize: 12,
                            color: '#6A7C92',
                            paddingVertical: 10
                          }
                        ]}>
                        {restaurant?.description}
                      </Animated.Text>

                      <Animated.View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                        {/* <Animated.View style={{ flexDirection: 'row' }}>
                          <Animated.Text>5 miles </Animated.Text>
                          <Animated.Text> . </Animated.Text>
                          <Animated.Text> 4.8 </Animated.Text>
                        </Animated.View> */}
                        <Button
                          onPress={() =>
                            this.props.navigation.navigate('StoreFeedback')
                          }
                          title={'Check Reviews'}
                          backgroundColor={'#FFBE00'}
                          containerStyle={{
                            width: '30%',
                            borderRadius: 50,
                            height: undefined,
                            paddingVertical: 10
                          }}
                          textColor="#000"
                        />
                      </Animated.View>
                    </Animated.View>
                    <ScrollableTab
                      {...props}
                      renderTab={(name, page, active, onPress, onLayout) => (
                        <TouchableOpacity
                          key={page}
                          onPress={() => onPress(page)}
                          onLayout={onLayout}
                          activeOpacity={0.4}>
                          <Animated.View
                            style={{
                              flex: 1,
                              height: 100,
                              backgroundColor: this.tabBg
                            }}>
                            <TabHeading
                              scrollable
                              style={{
                                backgroundColor: '#F1F2FA',
                                height: '100%'

                                // width: SCREEN_WIDTH / 2
                              }}
                              active={active}>
                              <Animated.Text
                                style={[
                                  fontStyles.ProximaRegularP2,
                                  {
                                    fontWeight: active ? 'bold' : 'normal',
                                    color: active ? this.textColor : '#6A7C92',
                                    fontSize: 12
                                  }
                                ]}>
                                {name}
                              </Animated.Text>
                            </TabHeading>
                          </Animated.View>
                        </TouchableOpacity>
                      )}
                      underlineStyle={{ backgroundColor: this.textColor }}
                    />
                  </Animated.View>
                </>
              )
            }}>
            <Tab heading="All">{this.tabContent(15, 0)}</Tab>
            {/* <Tab heading="Burgers">{this.tabContent(15, 1)}</Tab>
            <Tab heading="Fries">{this.tabContent(15, 0)}</Tab>
            <Tab heading="Chicken">{this.tabContent(15, 1)}</Tab> */}
          </Tabs>
        </Animated.ScrollView>
      </View>
    )
  }
}
