import ImageForm from './ImageForm';
import DefaultCard from '../DefaultCard';
import SettingsForm from './SettingsForm';
import SongForm from './SongForm';

const SettingsCard = (): JSX.Element => {
    return (
        <DefaultCard>
            <SettingsForm />

            <ImageForm />

            <SongForm />
        </DefaultCard>
    );
};

export default SettingsCard;
