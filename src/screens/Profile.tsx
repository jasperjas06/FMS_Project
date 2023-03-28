import React, {useCallback} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import {DataTable} from 'react-native-paper';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );
  const data = [
    {
      id: 1,
      name: 'jasper',
      food: 'xyz',
      age: '23',
    },
    {
      id: 2,
      name: 'mathi',
      food: 'xyz',
      age: '23',
    },
    {
      id: 3,
      name: 'velava',
      food: 'xyz',
      age: '23',
    },
    {
      id: 4,
      name: 'sanjay',
      food: 'xyz',
      age: '23',
    },
    {
      id: 5,
      name: 'deva',
      food: 'xyz',
      age: '23',
    },
  ];

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            // source={assets.card5}
          >
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.black}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p black marginLeft={sizes.s}>
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                width={200}
                height={200}
                radius={100}
                marginBottom={sizes.sm}
                // source={{uri: user?.avatar}}
                source={require('../assets/images/photo3.png')}
              />
              <Text h5 center black>
                {user?.name}
              </Text>
              <Text p center black>
                {user?.department}
              </Text>
              {/* <Block row marginVertical={sizes.m}> */}
                <Text>Fines</Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Sl</DataTable.Title>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>FavouriteFood</DataTable.Title>
                    <DataTable.Title>Age</DataTable.Title>
                  </DataTable.Header>

                  {data.map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{index + 1}</DataTable.Cell>
                      <DataTable.Cell>{item.name}</DataTable.Cell>
                      <DataTable.Cell>{item.food}</DataTable.Cell>
                      <DataTable.Cell>{item.age}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </Block>
            {/* </Block> */}
          </Image>

          {/* profile: stats */}
          {/* <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>{user?.stats?.posts}</Text>
                <Text>{t('profile.posts')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{(user?.stats?.followers || 0) / 1000}k</Text>
                <Text>{t('profile.followers')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{(user?.stats?.following || 0) / 1000}k</Text>
                <Text>{t('profile.following')}</Text>
              </Block>
            </Block>
          </Block> */}

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            {/* <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.aboutMe')}
            </Text> */}
            {/* <Text p lineHeight={26}>
              {user?.about}
            </Text> */}
          </Block>

          {/* profile: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            {/* <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.album')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block> */}
            <Block row justify="space-between" wrap="wrap">
              {/* <Image
                resizeMode="cover"
                source={assets?.photo1}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              /> */}
              {/* <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets?.photo2}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets?.photo3}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block> */}
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
