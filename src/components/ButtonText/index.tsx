import {
    TouchableOpacity,
    Text,
    TouchableOpacityProps,
    View,
    TouchableWithoutFeedbackProps,
} from "react-native";
import useStyle from "./styles";

type IProps = TouchableWithoutFeedbackProps & { text: string };

export default function ButtonText(props: IProps) {
    const styles = useStyle();

    return (
        <TouchableOpacity {...props}>
            <Text style={styles.buttonText}> {props.text}</Text>
        </TouchableOpacity>
    );
}
