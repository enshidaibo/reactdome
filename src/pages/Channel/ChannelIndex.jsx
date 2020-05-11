/**
 * 栏目管理列表
 */
import ContentLayout from '@/pages/A_Layout/ContentLayout';
import LeftList from './Components/LeftList';
import localRedux from './localRedux'

const initValue = {
    channelId: "0",
    version: 0,
    list: [],
    flattenList: [],
}
const ChannelIndex = ({ children, history, match }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            <ContentLayout>
                <LeftList history={history} match={match} />
                {children}
            </ContentLayout>
        </localRedux.localRudexProvider>
    )
}

export default ChannelIndex