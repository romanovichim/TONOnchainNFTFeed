import { Card} from 'antd';
import React, { useEffect } from 'react';
//import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { AppTitle } from '../src/components/AppTitle/AppTitle';
import { AuthButton } from '../src/components/AuthButton/AuthButton';
import { connector } from '../src/connector';
//import './app.scss';
import { useLoadItems } from './utils';
import HelloWorld from './components/HelloWorld'
import './app.scss';

const { Meta } = Card;

function App() {
	useEffect(() => {
		connector.restoreConnection();
	}, []);

	const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

	const [sentryRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: loadMore,
		// When there is an error, we stop infinite loading.
		// It can be reactivated by setting "error" state as undefined.
		disabled: !!error,
		// `rootMargin` is passed to `IntersectionObserver`.
		// We can use it to trigger 'onLoadMore' when the sentry comes near to become
		// visible, instead of becoming fully visible on the screen.
		rootMargin: '0px 0px 400px 0px',
	});

	return (
		<div className="app">
			<header>
				<AppTitle />
				<AuthButton />
			</header>
			<main>
				{items.map((item) => (
					//<ListItem key={item.item}>{item.download_url}</ListItem>
					<Card
						key={item.item}
						hoverable
						style={{ width: 240 }}
						cover={<img alt={item.item} src={item.download_url} />}
					>
						<Meta title={item.item} />
					</Card>
				))}
				{/* 
					As long as we have a "next page", we show "Loading" right under the list.
					When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
					This is our "sentry".
					We can also use another "sentry" which is separated from the "Loading" component like:
						<div ref={sentryRef} />
						{loading && <ListItem>Loading...</ListItem>}
					and leave "Loading" without this ref.
				*/}
				{(loading || hasNextPage) && (
					//<ListItem ref={sentryRef}>
					//	<Loading />
					//</ListItem>
					<Card
						ref={sentryRef}
						style={{
							width: 300,
						}}
					>
						<p>Loading////</p>
					</Card>
				)}
			</main>

		</div>
	);
}

export default App;
