import os
import config
import subprocess


print('Cleaning up data\n'*5)
subprocess.run(['rm', '/Users/sampathm/PycharmProjects/ShabdaDemo/static/data/temp/*'])
subprocess.run(['rm', '/Users/sampathm/PycharmProjects/ShabdaDemo/static/data/uploads/*'])


def convert_to_wav(src_filename, dest_filename=None):
    dest_filename = src_filename.rsplit('.', 1)[0] + '.wav'
    dest_filename = os.path.join(config.UPLOADS_DIR, os.path.basename(dest_filename))
    process = subprocess.run(['/Users/sampathm/anaconda3/bin/ffmpeg', '-i', src_filename, dest_filename, '-y'])
    print('process id \n{}\n'.format(process))
