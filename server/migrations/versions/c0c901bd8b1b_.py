"""empty message

Revision ID: c0c901bd8b1b
Revises: 1f5991bd0390
Create Date: 2024-10-08 17:00:44.492149

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c0c901bd8b1b'
down_revision = '1f5991bd0390'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_details', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pfp', sa.LargeBinary(), nullable=True))
        batch_op.add_column(sa.Column('pfp_name', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_details', schema=None) as batch_op:
        batch_op.drop_column('pfp_name')
        batch_op.drop_column('pfp')

    # ### end Alembic commands ###
