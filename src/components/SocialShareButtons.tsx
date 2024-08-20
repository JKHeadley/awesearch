import React from 'react';
import {
  Wrap,
  IconButton,
  useColorModeValue,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaReddit,
  FaTelegram,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { RiMessengerLine } from 'react-icons/ri';

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  title,
}) => {
  const iconColor = useColorModeValue('blue.600', 'blue.300');
  const buttonSize = useBreakpointValue({ base: 'md', lg: 'lg' });

  const shareButtons = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'facebook',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`,
    },
    {
      name: 'X',
      icon: FaXTwitter,
      color: 'gray',
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url,
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'linkedin',
      shareUrl: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(title)}`,
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'whatsapp',
      shareUrl: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    },
    // {
    //   name: 'Messenger',
    //   icon: RiMessengerLine,
    //   color: 'messenger',
    //   shareUrl: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
    //     url,
    //   )}&app_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${encodeURIComponent(url)}`,
    // },
    {
      name: 'Reddit',
      icon: FaReddit,
      color: 'orange',
      shareUrl: `https://reddit.com/submit?url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(title)}`,
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      color: 'telegram',
      shareUrl: `https://t.me/share/url?url=${encodeURIComponent(
        url,
      )}&text=${encodeURIComponent(title)}`,
    },
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Wrap spacing={2} justify={{ base: 'center', md: 'flex-start' }}>
      {shareButtons.map((button) => (
        <Tooltip key={button.name} label={`Share on ${button.name}`}>
          <IconButton
            aria-label={`Share on ${button.name}`}
            icon={<button.icon />}
            onClick={() => handleShare(button.shareUrl)}
            colorScheme={button.color}
            size={buttonSize}
          />
        </Tooltip>
      ))}
    </Wrap>
  );
};

export default SocialShareButtons;
