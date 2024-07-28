import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast.ts';
import { fetchIdeasWithCaptions } from '@/apis/auth/services.api.ts';
import { EntityCard } from '@/components/cards/EntityCard.tsx';
import { SaveContentResponse } from '@/models/services.model.ts';
import useRefresh from '@/hooks/use-refresh.ts';

export interface CaptionProfilePageProps {

}

export const CaptionProfilePage = (props:CaptionProfilePageProps) => {
  const {} = props;
  const [ savedContents, setSavedContents ] = useState<SaveContentResponse[]>([])
  const { toast } = useToast();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { refreshKey } = useRefresh();

  const fetchSavedContents = async () => {
    setIsLoading(true)
    try {
      const res = await fetchIdeasWithCaptions();
      if (res && res.data) {
        setSavedContents(res.data)
      }
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.response.data.message
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSavedContents();
  }, []);

  useEffect(() => {
    fetchSavedContents();
  }, [refreshKey]);
    return (
        <div className={"caption-profile-page flex flex-col gap-10 justify-start pl-[30rem] pt-[6rem]"}>
            <h1 className="text-black text-4xl font-bold">Saved Contents</h1>
          {
            savedContents.map((content, index) => (
              <>
                <h2 className="text-black text-2xl font-bold">{content.idea}</h2>
                {
                  content.captions.map((caption, index) => (
                    <EntityCard
                      isSavedContent
                      key={index}
                      ideaId={content.ideaId}
                      captionId={caption.captionId}
                      caption={caption.caption}
                      refresh={fetchSavedContents}
                      onEntityClick={() => {}} />
                  ))
                }
              </>

            ))
          }
        </div>
    )
}