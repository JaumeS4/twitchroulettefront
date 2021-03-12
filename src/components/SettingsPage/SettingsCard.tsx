import ImageForm from './ImageForm';
import DefaultCard from '../DefaultCard';
import SettingsForm from './SettingsForm';
import SongForm from './SongForm';
import ImageSettingsForm from './ImageSettingsForm';

const SettingsCard = (): JSX.Element => {
    return (
        <DefaultCard>
            <SettingsForm />

            <ImageSettingsForm />

            <ImageForm />

            <SongForm />
        </DefaultCard>
    );
};

export default SettingsCard;
