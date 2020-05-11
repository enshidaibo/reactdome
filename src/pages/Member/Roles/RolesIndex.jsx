import ContentLayout, { LeftContent, RightContent } from '@/pages/A_Layout/ContentLayout';
import localRedux from './localRedux'
import LeftMenu from './Components/LeftMenu';

const initValue = {
    list: [],
    selectKeys: [],
    searchValue: ''
}
const RolesIndex = ({ history, match, children }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            <ContentLayout>
                <LeftMenu history={history} match={match}></LeftMenu>
                {children}
            </ContentLayout>
        </localRedux.localRudexProvider>
    )
}

export default RolesIndex 
