import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { styles } from './styles';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}
export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordUserToClipboard() {
    setIsCopying(true);
    if (discord) await Clipboard.setStringAsync(discord);
    Alert.alert(
      'Discord copiado',
      `O discord ${discord} está agora na sua área de transferência, cole-o no discord para adicionar seu novo duo!`,
    );
    setIsCopying(false);
  }
  return (
    <Modal {...rest} animationType="fade" transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <MaterialIcons
            name="check-circle-outline"
            size={64}
            color={THEME.COLORS.SUCCESS}
          />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}> Adicione no Discord </Text>

          <TouchableOpacity
            disabled={isCopying}
            style={styles.discordButton}
            onPress={handleCopyDiscordUserToClipboard}
          >
            <Text style={styles.discord}>
              {isCopying ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
