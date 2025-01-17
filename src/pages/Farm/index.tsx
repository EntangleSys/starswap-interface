import { Trans } from '@lingui/macro'
import { useCallback, useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Text } from 'rebass'
import Row, { AutoRow, RowFixed, RowBetween } from '../../components/Row'
import { TYPE } from '../../theme'
import { ButtonFarm } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import FarmTitle from '../../components/farm/FarmTitle'
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink'
import FarmCard from '../../components/farm/FarmCard'
import CurrencyLogo from '../../components/CurrencyLogo'
import { marginTop, maxWidth, paddingTop } from 'styled-system'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import STCLogo from '../../assets/images/stc.png'
import STCBlueLogo from '../../assets/images/stc_logo_blue.png'
import PortisIcon from '../../assets/images/portisIcon.png'
import { useIsDarkMode } from '../../state/user/hooks'
import { useActiveWeb3React } from 'hooks/web3'

import axios from 'axios';
import useSWR from "swr";

const fetcher = (url:any) => axios.get(url).then(res => res.data)

/*
const fetcher = (
  url:any,
  {
    method: 'POST', 
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {"key" : "some text"}
  }
  ) => fetch(url).then((res) => res.json());
*/

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 4px;
`
const FarmRow = styled(RowBetween)`
  background: ${({ theme }) => theme.bg7};
  line-height: 20px;
  border-radius: 8px;
  padding: 6px 16px;
`


export default function Farm({ history }: RouteComponentProps) {
  let network = 'barnard';
  const { account, chainId } = useActiveWeb3React()
  if (chainId === 1) {
    network = 'main';
  }

  const { data, error } = useSWR(
    // "http://a1277180fcb764735801852ac3de308f-21096515.ap-northeast-1.elb.amazonaws.com:80/v1/starswap/lpTokenFarms",
    `https://swap-api.starcoin.org/${network}/v1/lpTokenFarms`,
    fetcher
  );


  // if (error) return "An error has occurred.";
  // if (!data) return "Loading...";
  if (error) return null;
  if (!data) return null;
  const list = data;

  // const darkMode = useIsDarkMode();

  /*
  const list = [
    {
      liquidityTokenFarmId: { 
        farmAddress: "1", 
        liquidityTokenId: { tokenXId: "Bot", tokenYId: "Ddd", liquidityTokenAddress: "0x07fa08a855753f0ff7292fdcbe871216" }
      },
      description: "Bot<->Ddd Pool", 
      sequenceNumber: 11, 
      totalStakeAmount: null, 
      deactived: false, 
      createdBy: "admin", 
      updatedBy: "admin", 
      createdAt: 1630661107485, 
      updatedAt: 1630661107485 
    },
    {
      liquidityTokenFarmId: { 
        farmAddress: "2", 
        liquidityTokenId: { tokenXId: "Bot", tokenYId: "Ddd", liquidityTokenAddress: "0x07fa08a855753f0ff7292fdcbe871216" }
      },
      description: "Bot<->Ddd Pool", 
      sequenceNumber: 11, 
      totalStakeAmount: null, 
      deactived: false, 
      createdBy: "admin", 
      updatedBy: "admin", 
      createdAt: 1630661107485, 
      updatedAt: 1630661107485 
    },
    {
      liquidityTokenFarmId: { 
        farmAddress: "0x07fa08a855753f0ff7292fdcbe871216", 
        liquidityTokenId: { tokenXId: "Bot", tokenYId: "Ddd", liquidityTokenAddress: "0x07fa08a855753f0ff7292fdcbe871216" }
      },
      description: "Bot<->Ddd Pool", 
      sequenceNumber: 11, 
      totalStakeAmount: null, 
      deactived: false, 
      createdBy: "admin", 
      updatedBy: "admin", 
      createdAt: 1630661107485, 
      updatedAt: 1630661107485 
    },
    {
      liquidityTokenFarmId: { 
        farmAddress: "3", 
        liquidityTokenId: { tokenXId: "Bot", tokenYId: "Ddd", liquidityTokenAddress: "0x07fa08a855753f0ff7292fdcbe871216" }
      },
      description: "Bot<->Ddd Pool", 
      sequenceNumber: 11, 
      totalStakeAmount: null, 
      deactived: false, 
      createdBy: "admin", 
      updatedBy: "admin", 
      createdAt: 1630661107485, 
      updatedAt: 1630661107485 
    },
    {
      liquidityTokenFarmId: { 
        farmAddress: "0x07fa08a855753f0ff7292fdcbe871216", 
        liquidityTokenId: { tokenXId: "Bot", tokenYId: "Ddd", liquidityTokenAddress: "0x07fa08a855753f0ff7292fdcbe871216" }
      },
      description: "Bot<->Ddd Pool", 
      sequenceNumber: 11, 
      totalStakeAmount: null, 
      deactived: false, 
      createdBy: "admin", 
      updatedBy: "admin", 
      createdAt: 1630661107485, 
      updatedAt: 1630661107485 
    },
    {
      liquidityTokenFarmId: { 
        farmAddress: "0x07fa08a855753f0ff7292fdcbe871216", 
        liquidityTokenId: { tokenXId: "Bot", tokenYId: "Ddd", liquidityTokenAddress: "0x07fa08a855753f0ff7292fdcbe871216" }
      },
      description: "Bot<->Ddd Pool", 
      sequenceNumber: 11, 
      totalStakeAmount: null, 
      deactived: false, 
      createdBy: "admin", 
      updatedBy: "admin", 
      createdAt: 1630661107485, 
      updatedAt: 1630661107485 
    },
  ]
  */

  return (
    <>
      <FarmTitle />
      <AutoRow justify="center" style={{ paddingTop: '50px', maxWidth: '1200px' }}>
        {list ? list.map((item:any,index:any) => (
            <FarmCard key={index}>
              <AutoColumn justify="center">
                <RowFixed>
                  <StyledEthereumLogo src={STCBlueLogo} size={'48px'} />
                  <StyledEthereumLogo src={EthereumLogo} style={{ marginRight: '1.25rem' }} size={'48px'} />
                </RowFixed>
                <Text fontSize={16} marginTop={23}>
                  {item.liquidityTokenFarmId.liquidityTokenId.tokenYId}/{item.liquidityTokenFarmId.liquidityTokenId.tokenXId}
                </Text>
              </AutoColumn>
              <FarmRow style={{ marginTop: '30px' }}>
                <RowFixed>
                  <TYPE.black fontWeight={400} fontSize={14}>
                    <Trans>Token Pair</Trans>
                  </TYPE.black>
                </RowFixed>
                <RowFixed>
                  <TYPE.black fontSize={14}>
                    {item.liquidityTokenFarmId.liquidityTokenId.tokenXId} - {item.liquidityTokenFarmId.liquidityTokenId.tokenYId} 
                  </TYPE.black>
                </RowFixed>
              </FarmRow>
              <FarmRow style={{ marginTop: '10px' }}>
                <RowFixed>
                  <TYPE.black fontWeight={400} fontSize={14}>
                    <Trans>TVL in USDT</Trans>
                  </TYPE.black>
                </RowFixed>
                <RowFixed>
                  <TYPE.black fontSize={14}>
                    {item.tvlInUsd}
                  </TYPE.black>
                </RowFixed>
              </FarmRow>
              <FarmRow style={{ marginTop: '10px', marginBottom: '20px' }}>
                <RowFixed>
                  <TYPE.black fontWeight={400} fontSize={14}>
                    <Trans>Harvest Token</Trans>
                  </TYPE.black>
                </RowFixed>
                <RowFixed>
                  <TYPE.black fontSize={14}>
                    {item.rewardTokenId}
                  </TYPE.black>
                </RowFixed>
              </FarmRow>
              {/*
              <FarmRow style={{ marginTop: '10px', background: '#2FD8B2', marginBottom: '30px' }}>
                <RowFixed>
                  <TYPE.black fontWeight={400} fontSize={14}>
                    <Trans>Estimated annualized rate of return:</Trans>
                  </TYPE.black>
                </RowFixed>
                <RowFixed>
                  <TYPE.black fontSize={14} style={{wordBreak: 'break-all'}}>
                    {item.estimatedApy}
                  </TYPE.black>
                </RowFixed>
              </FarmRow>
              */}
              <ButtonFarm as={Link} to={`/farm/${item.liquidityTokenFarmId.liquidityTokenId.tokenXId}/${item.liquidityTokenFarmId.liquidityTokenId.tokenYId}`}>
                <TYPE.main color={'#fff'}>
                  <Trans>Stake</Trans>
                </TYPE.main>
              </ButtonFarm>
            </FarmCard>
        )) : null}
      </AutoRow>
      <SwitchLocaleLink />
    </>
  )
}
