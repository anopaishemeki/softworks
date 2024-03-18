import {
    Modal as RNModal,
    ModalProps,
    KeyboardAvoidingView,
    View,
    Platform,
} from 'react-native'







export const Modal = ({ isopen, withInput, children, ...rest } )=> {
    
    const content = withInput ? (
        <KeyboardAvoidingView
            className='items-center justify-center flex-1 px-3 bg-zinc-900/40'
            behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
        </KeyboardAvoidingView>)
        : (
            <View className='items-center justify-center flex-1 px-3 bg-zinc-900/40'>
                {children}
            </View>
        )
    return
     (
        <RNModal 
            visible = { isopen }
            transparent
            animationType = 'fade'
            statusBarTranslucent
            {...rest }
            >
        { content }
    
    </RNModal >
    
     )
}