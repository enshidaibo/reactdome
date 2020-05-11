/**
 * 工作流
 */
import ContentLayout from '@/pages/A_Layout/ContentLayout';
import localRedux from './localRedux'

const initValue = {}
const Index = ({ children }) => {
    return (
        <localRedux.localRudexProvider value={initValue}>
            <ContentLayout>
                {children}
            </ContentLayout>
        </localRedux.localRudexProvider>
    )
}

export default Index