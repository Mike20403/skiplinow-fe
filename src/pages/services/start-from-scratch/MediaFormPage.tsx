import { Input } from '@/components/ui/input.tsx';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  captionGeneratorValidationSchema, topicAndToneGeneratorValidationSchema,
  topicGeneratorValidationSchema,
} from '@/validates/caption-inputs.validator.ts';
import { useQueryParams } from '@/hooks/use-query-params.ts';
import { UNKNOWN } from '@/constants/common.constant.ts';
import { capitalizeFirstLetter } from '@/utils/string.utils.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button.tsx';
import { useToast } from '@/components/ui/use-toast';
import { generateCaptions } from '@/apis/auth/services.api.ts';
import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { EntityCard } from '@/components/cards/EntityCard.tsx';
export interface MediaFormPageProps {
  mediaName?:string
}
export const MediaFormPage = (props: MediaFormPageProps) => {
  const query = useQueryParams()
  const mediaName = query.get('name') || UNKNOWN
  const { toast } = useToast();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ generatedCaptions, setGeneratedCaptions ] = useState<string[]>([])
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      topic: '',
      tone: '',
    },
    resolver: yupResolver(topicAndToneGeneratorValidationSchema),
  });

  const tones = [
    { value: 'friendly', label: 'Friendly' },
    { value: 'professional', label: 'Professional' },
    { value: 'funny', label: 'Funny' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'motivational', label: 'Motivational' },
    { value: 'sarcastic', label: 'Sarcastic' },
    { value: 'serious', label: 'Serious' },
    { value: 'upbeat', label: 'Upbeat' },
    { value: 'witty', label: 'Witty' },
  ]

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const res = await generateCaptions({subject: data.topic,tone: data.tone,social: mediaName})
      if (res && res.data ) {
        toast({
          title: 'Success',
          variant: 'success',
          description: 'Captions generated successfully!!',
        })
        setGeneratedCaptions(res.data)
      }
    } catch (err) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: err.response.data.message,
      })
    }
    setIsLoading(false)
  }

  return (<>
    <form className="grid w-full max-w-sm items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-4xl font-bold">{capitalizeFirstLetter(mediaName)} Post</h1>
      <p className="text-lg">What topic do you want a caption for?</p>
      <Input {...register("topic", { required: true })}
             className={`${errors.topic ? 'focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600' : ''} w-[50rem]`}
             type="text" id="topic" placeholder="Enter your topic name" />
      {errors.topic && <span className="text-red-500">This topic field can't be empty</span>}
      <p className="text-lg mt-4">What kind of post do you want ideas for?</p>
      <Controller
        control={control}
        name="tone"
        render={(
          { field }) => {
          return (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger  className="w-[50rem]">
                <SelectValue placeholder="Select a tone" defaultValue={tones[0].label}/>
              </SelectTrigger>
              <SelectContent >
                {
                  tones.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          )
        }}
        >
      </Controller>
      {errors.tone && <span className="text-red-500">This tone field is required</span>}
      <Button disabled={isLoading} type="submit" className="w-[15rem] mt-10 gap-4">
        <ArrowPathIcon className={`w-6 h-6 ${!isLoading ? 'hidden' : 'animate-spin'}`} />
        Generate Caption
      </Button>
    </form>
    <h1 className={`${!(generatedCaptions.length) ? 'hidden' : ''} text-lg font-bold mt-5`}>Captions generated for you:</h1>
    <div className="generated-section flex flex-col gap-6 mt-5">
      {
        generatedCaptions.length > 0 && (
          generatedCaptions.map((caption, index) => (
            <EntityCard caption={caption} onCaptionClick={() => {}} key={index} />
        )))
      }
    </div>
  </>)
}