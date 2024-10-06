"""empty message

Revision ID: 1f5991bd0390
Revises: 5acf7c319b25
Create Date: 2024-10-06 14:46:56.199059

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f5991bd0390'
down_revision = '5acf7c319b25'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('attendance', schema=None) as batch_op:
        batch_op.alter_column('uid',
               existing_type=sa.INTEGER(),
               type_=sa.Text(),
               existing_nullable=False)

    with op.batch_alter_table('user_credentials', schema=None) as batch_op:
        batch_op.alter_column('uid',
               existing_type=sa.INTEGER(),
               type_=sa.Text(),
               existing_nullable=False)

    with op.batch_alter_table('user_details', schema=None) as batch_op:
        batch_op.alter_column('uid',
               existing_type=sa.INTEGER(),
               type_=sa.Text(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_details', schema=None) as batch_op:
        batch_op.alter_column('uid',
               existing_type=sa.Text(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    with op.batch_alter_table('user_credentials', schema=None) as batch_op:
        batch_op.alter_column('uid',
               existing_type=sa.Text(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    with op.batch_alter_table('attendance', schema=None) as batch_op:
        batch_op.alter_column('uid',
               existing_type=sa.Text(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
