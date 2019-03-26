import subprocess


def convert_to_wav(src_filename, dest_filename=None):
    dest_filename = src_filename.rsplit('.', 1)[0] + '.wav'
    process = subprocess.run(['/Users/sampathm/anaconda3/bin/ffmpeg', '-yi', src_filename, dest_filename])
    print('process id \n{}\n'.format(process))