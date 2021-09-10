import { animated, useSpring } from 'react-spring';

import React from 'react';

const Profile = () => {
	const props = useSpring({
		opacity: 1,
		color: '#fff',
		fontSize: 20,
		position: 'absolute',
		left: 20,
		top: 100,
		from: { opacity: 0, color: '#000', fontSize: 12, position: 'absolute', left: 1000, top: 100 },
		config: { duration: 1000, mass: 1, tension: 170, friction: 26 }
	});

	return <animated.div style={props}>Hello World</animated.div>;
};

export { Profile };
