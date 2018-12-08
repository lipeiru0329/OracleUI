import duoIcon from 'images/DUO_icon.png';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { SDivFlexCenter, SHeader } from './_styled';
//import LocaleSelect from './Common/LocaleSelect';

interface IProps {}

export default class Header extends React.Component<IProps> {
	public render() {
		//const path = (location as any).pathname.toLowerCase();
		return (
			<SHeader>
				<SDivFlexCenter horizontal width={'1200px'} height={'60px'}>
					<div style={{ display: 'flex' }}>
						<Link to={'/'}>
							<div className="icon-wrapper">
								<img src={duoIcon} style={{ width: "150px", position: "relative", top: '-30px' }} />
							</div>
						</Link>
					</div>
				</SDivFlexCenter>
			</SHeader>
		);
	}
}
