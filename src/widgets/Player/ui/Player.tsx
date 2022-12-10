import React, {FC, memo} from 'react';
import {
    Player as ReactPlayer,
    ControlBar,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
} from 'video-react';

interface PlayerProps {
    src: string
}

export const Player: FC<PlayerProps> = ({src}) => {
    return (
        <ReactPlayer poster="/assets/poster.png">
            <source src={src}/>
            <ControlBar>
                <TimeDivider order={4.2}/>
                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]}/>
                <VolumeMenuButton/>
            </ControlBar>
        </ReactPlayer>
    );
};
export default memo(Player);
