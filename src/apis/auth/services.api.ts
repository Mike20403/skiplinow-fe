import { axiosClient } from '../../../utilities/axios.ts';
import { GeneratePromptBody, SaveCaptionBody } from '@/models/services.model.ts';

export async function generateCaptions(payload:GeneratePromptBody) {
  return axiosClient
    .post(`content/captions`, { ...payload})
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function generatePostIdeas(payload: { idea: string }) {
  return axiosClient
    .post(`content/ideas`, { ...payload})
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function generateCaptionsFromIdea(payload:{ idea: string }) {
  return axiosClient
    .post(`content/captions-from-idea`, { ...payload})
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function saveGeneratedCaptions(payload:SaveCaptionBody) {
  return axiosClient
    .post(`content/save`, { captions: payload.captions, idea: payload.idea})
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function fetchIdeasWithCaptions() {
  return axiosClient
    .get(`content/captionsByIdeas`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function fetchIndividualCaptions() {
  return axiosClient
    .get(`content/captionsWithoutIdea`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function unsaveCaptions(captionId?: string, ideaId?: string) {
  return axiosClient
    .delete(`content/unsave/idea/${ideaId}/caption/${captionId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}