import { Button } from '@/components/ui/button.tsx';
import { SHARE_URL } from '@/constants/environment.constant.ts';
import { useToast } from '@/components/ui/use-toast.ts';
import { saveGeneratedCaptions, unsaveCaptions } from '@/apis/auth/services.api.ts';
import { useState } from 'react';

export interface CaptionCardProps {
  idea?: string;
  caption: string;
  onEntityClick: () => void;
  disabledAction?: boolean;
  isSavedContent?: boolean;
  captionId?: string;
  ideaId?: string;
  disableSave?: boolean;
  refresh?: () => void;
}

export const EntityCard = (props: CaptionCardProps) => {
  const {
    caption,
    onEntityClick,
    refresh,
    disabledAction = false,
    idea,
    ideaId,
    disableSave,
    isSavedContent = false,
    captionId = undefined,
  } = props;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleShare = () => {
    const encodedCaption = encodeURIComponent(caption);
    const shareUrl = `${SHARE_URL}/share?caption=${encodedCaption}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl, '_blank', 'width=600,height=400');
  };

  const handleSave = async (e) => {
    setIsLoading(true);
    try {
      const res = await saveGeneratedCaptions({ captions: [caption], idea: idea });
      if (res && res.data) {
        toast({
          title: 'Success',
          variant: 'success',
          description: 'Caption saved successfully!!',
        });
        setIsLoading(false);
      }
    } catch (e) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: e.response.data.message,
      });
    }
    setIsLoading(false);
  };

  const handleUnsave = async () => {
    setIsLoading(true);
    try {
      const res = await unsaveCaptions(captionId, ideaId);
      if (res && res.data) {
        toast({
          title: 'Success',
          variant: 'success',
          description: 'Caption unsaved successfully!!',
        });
      }
    } catch (e) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: e.response.data.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <div
        className="flex flex-col border-2 gap-4 hover:bg-appHover bg-white p-5 rounded-lg shadow-md cursor-pointer max-w-[50rem]"
        onClick={onEntityClick}
      >
        <p className="text-lg">{caption}</p>
        <div className={`${disabledAction ? 'hidden' : ''} flex flex-row justify-end gap-4`}>
          <Button
            onClick={handleShare}
            className={`p-2 text-sm bg-appPrimary font-bold hover:bg-appSecondary min-w-[5rem]`}
          >
            Share
          </Button>
          <Button
            disabled={disableSave || isLoading}
            onClick={handleSave}
            className={`${isSavedContent ? 'hidden' : ''} p-2 text-sm bg-appSecondary font-bold hover:bg-appTertiary min-w-[5rem]`}
          >
            Save
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleUnsave}
            className={`${!isSavedContent ? 'hidden' : ''} p-2 text-sm bg-appSecondary font-bold hover:bg-appTertiary min-w-[5rem]`}
          >
            Unsave
          </Button>
        </div>
      </div>
    </>
  );
};
