import { Input } from '@/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { topicGeneratorValidationSchema } from '@/validates/caption-inputs.validator.ts';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast.ts';
import { generateCaptionsFromIdea, generatePostIdeas } from '@/apis/auth/services.api.ts';
import { EntityCard } from '@/components/cards/EntityCard.tsx';
import { Link } from 'react-router-dom';
import { useQueryParams } from '@/hooks/use-query-params.ts';
import { UNKNOWN } from '@/constants/common.constant.ts';

export interface GetInpsiredPageProps { }

export const GetInpsiredPage = (props: GetInpsiredPageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic: '',
    },
    resolver: yupResolver(topicGeneratorValidationSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const query = useQueryParams();
  const idea = query.get('idea') || UNKNOWN;
  const [disableItems, setDisableItems] = useState<number[]>([]);

  const handleGenerateIdea = async (data: any) => {
    const { topic } = data;
    try {
      setIsLoading(true);
      const res = await generatePostIdeas({ topic });
      if (res && res.data) {
        toast({
          title: 'Success',
          variant: 'success',
          description: 'Ideas generated successfully!!',
        });
        setGeneratedIdeas(res.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.response.data.message,
      });
    }
    setIsLoading(false);
  };

  const handleEntityClick = (index: number) => {
    setDisableItems([...disableItems, index]);
  };

  const handleGenerateCaptionFromIdea = async () => {
    setIsLoading(true);
    try {
      const res = await generateCaptionsFromIdea({ idea });
      if (res && res.data) {
        toast({
          title: 'Success',
          variant: 'success',
          description: 'Captions generated successfully!!',
        });
        setGeneratedCaptions(res.data);
        setDisableItems([]);
      }
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.response.data.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Get Inspired</h1>
      {idea !== UNKNOWN ? (
        <>
          <h2>Generated captions for idea: </h2>
          <Input className="text-2xl mt-4 max-w-[50rem]" disabled defaultValue={idea} />
          <Button className="w-[15rem] mt-10 gap-4" onClick={handleGenerateCaptionFromIdea}>
            <ArrowPathIcon className={`w-6 h-6 ${!isLoading ? 'hidden' : 'animate-spin'}`} />
            Generate Captions{' '}
          </Button>
          <h1 className={`${!generatedCaptions.length ? 'hidden' : ''} text-lg font-bold mt-5`}>
            Captions generated for you:
          </h1>
          <div className="generated-section flex flex-col gap-6 mt-5">
            {generatedCaptions.length > 0 &&
              generatedCaptions.map((caption, index) => (
                <EntityCard
                  caption={caption}
                  idea={idea}
                  disableSave={disableItems.includes(index)}
                  onEntityClick={() => handleEntityClick(index)}
                  key={index}
                />
              ))}
          </div>
        </>
      ) : (
        <>
          {generatedIdeas.length > 0 ? (
            <>
              <h2>Choose an idea to generate captions</h2>
              <div className="grid grid-cols-2 gap-4">
                {generatedIdeas.map((idea, index) => (
                  <Link key={index} to={`.?idea=${idea}`}>
                    <EntityCard onEntityClick={() => { }} key={index} caption={idea} disabledAction={true} />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-lg">
                Stick staring at a blank page? Tell us what topic you have in mind and Whale AI will generate a list of
                post ides and captions for you
              </p>
              <h2 className="text-2xl mt-4">What topic do you want ideas for?</h2>
              <form className="grid w-full max-w-sm items-center gap-1.5" onSubmit={handleSubmit(handleGenerateIdea)}>
                <label htmlFor="Topic" className="text-xl font-semibold mt-10">
                  Topic:
                </label>
                <Input
                  {...register('topic', { required: true })}
                  className={`${errors.topic ? 'focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600' : ''} w-[50rem]`}
                  type="text"
                  id="topic"
                  placeholder="Enter your topic name"
                />
                {errors.topic && <span className="text-red-500">This field is required</span>}
                <Button disabled={isLoading} type="submit" className="w-[15rem] mt-10 gap-4">
                  <ArrowPathIcon className={`w-6 h-6 ${!isLoading ? 'hidden' : 'animate-spin'}`} />
                  Generate Ideas
                </Button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};
