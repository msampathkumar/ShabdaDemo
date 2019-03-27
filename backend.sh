#!/bin/bash


# Send input into ML Repo
cp -p /mnt1/mageswaran/ShabdaDemo/static/data/uploads/sample1.wav /mnt1/mageswaran/SpeechDenoisingWithDeepFeatureLosses




# Shabda Audio Processing
cd /mnt1/mageswaran/SpeechDenoisingWithDeepFeatureLosses

inputfile='sample1.wav'

sox ${inputfile%.*}.wav -e float -b 32 dataset/valset_noisy/${inputfile%.*}.wav rate -v -I 16000 channels 1


source activate quantipy2.7

CUDA_VISIBLE_DEVICES=1 python senet_infer.py

echo "Enchanced video file: ${inputfile%.*}.wav"

cp /mnt1/mageswaran/SpeechDenoisingWithDeepFeatureLosses/dataset/valset_noisy_denoised/${inputfile%.*}.wav /mnt1/mageswaran/ShabdaDemo/static/data/downloads

# Emotion Detection Code
cd /mnt1/mageswaran/Speech-Emotion-Analyzer

source activate qPy3

python Prediction.py /mnt1/mageswaran/SpeechDenoisingWithDeepFeatureLosses/dataset/valset_noisy_denoised/${inputfile%.*}.wav








