import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/links/coingecko`}
          render={() => {
            window.open("https://www.coingecko.com/en/coins/gocryptome", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }}
        />
        <Route path={`${APP_PREFIX_PATH}/links/coinmarketcap`}
          render={() => {
            window.open("https://coinmarketcap.com/currencies/gocryptome/", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }}
        />
        <Route path={`${APP_PREFIX_PATH}/links/dextools`}
          render={() => {
            window.open("https://www.dextools.io/app/bsc/pair-explorer/0xe7cf56a19b2e76dfbdd10a7cd953317ec9860e86", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }}
        />
        <Route path={`${APP_PREFIX_PATH}/links/pancakeswap`}
          render={() => {
            window.open("https://pancakeswap.finance/swap/", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }
          }
        />

        <Route path={`${APP_PREFIX_PATH}/links/twitter`}
          render={() => {
            window.open("https://twitter.com/GoCryptoMeCoin", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }
          }
        />

        <Route path={`${APP_PREFIX_PATH}/links/telegram`}
          render={() => {
            window.open("https://t.me/GoCryptoMe", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }
          } />


        <Route path={`${APP_PREFIX_PATH}/links/medium`}
          render={() => {
            window.open("https://gocryptome.medium.com/", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }
          }
        />

        <Route path={`${APP_PREFIX_PATH}/links/bscscan`}
          render={() => {
            window.open("https://bscscan.com/address/0x9528cceb678b90daf02ca5ca45622d5cbaf58a30/", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }
          }
        />

        <Route path={`${APP_PREFIX_PATH}/links/github`}
          render={() => {
            window.open("https://github.com/GoBlockchain2022", '_blank');
            return <Redirect to={`${APP_PREFIX_PATH}/dashboards/`} />
          }
          }
        />
        <Redirect from={`${APP_PREFIX_PATH}/links/`} to={`${APP_PREFIX_PATH}/dashboards/`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);

/*
*/